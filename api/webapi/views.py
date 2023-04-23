from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomUser, ChannelInfo, StreamInfo
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist

@csrf_exempt
@require_http_methods(["GET"])
def get_full_user_info_by_username(request, username):
    try:
        user = CustomUser.objects.get(username=username)
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)

    try:
        stream_info = StreamInfo.objects.get(user=user)
        channel_info = ChannelInfo.objects.get(user=user)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Something wrong'}, status=502)


    output = {
        "stream": stream_info.get_json_data(),
        "channel": channel_info.get_json_data(),
        "username": username
    }
    return JsonResponse(output)

@csrf_exempt
@require_http_methods(["GET"])
def is_user_logged(request):
    if request.user.is_authenticated:
        return JsonResponse({'isLogged': True}, status=200)

    return JsonResponse({'isLogged': False}, status=200)

@csrf_exempt
@require_http_methods(["GET"])
def all_active_streams(request):
    streams = StreamInfo.objects.filter(is_active=True)
    data = [] 
    for i in streams:
        streamInfo = {
            "streamTitle": i.title,
            "activityType": i.activity_type,
            "userName": i.user.username, 
            "channelName": i.user.channelinfo.channel_name, 
        }
        data.append(streamInfo)

    return JsonResponse(data, status=200, safe=False)

# @csrf_exempt
# @require_http_methods(["GET"])
# def stream_data_by_username(request, username):
#     try:
#         user = CustomUser.objects.get(username=username)
#     except CustomUser.DoesNotExist:
#         return JsonResponse({'error': 'User does not exist'}, status=404)

#     try:
#         stream_info = StreamInfo.objects.get(user=user)
#     except StreamInfo.DoesNotExist:
#         return JsonResponse({'error': 'Something wrong'}, status=502)

#     return JsonResponse(stream_info.get_json_data(), status=200)

@csrf_exempt
@require_http_methods(["GET"])
def curr_user_stream_data(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not logged'}, status=401)

    try:
        stream_info = StreamInfo.objects.get(user=request.user)
    except StreamInfo.DoesNotExist:
        return JsonResponse({'error': 'Something wrong'}, status=502)

    return JsonResponse(stream_info.get_json_data(), status=200)


@csrf_exempt
@require_http_methods(["GET"])
def curr_user_channel_data(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not logged'}, status=401)

    try:
        channel_info = ChannelInfo.objects.get(user=request.user)
    except ChannelInfo.DoesNotExist:
        return JsonResponse({'error': 'Something wrong'}, status=502)

    return JsonResponse(channel_info.get_json_data(), status=200)

@csrf_exempt
@require_http_methods(["PUT"])
def curr_user_channel_update(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not logged'}, status=401)

    data = json.loads(request.body)
    channel_name = data.get('channelName')
    profile_description = data.get('profileDescription')

    try:
        channel_info = ChannelInfo.objects.get(user=request.user)
    except ChannelInfo.DoesNotExist:
        return JsonResponse({'error': 'Something wrong'}, status=502)

    if channel_name:
        channel_info.channel_name = channel_name
    if profile_description:
        channel_info.profile_description = profile_description
    channel_info.save()

    return JsonResponse({'success': 'Channel info updated successfully.'}, status=200)

@csrf_exempt
@require_http_methods(["PUT"])
def curr_user_stream_update(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not logged'}, status=401)

    data = json.loads(request.body)
    title = data.get('title')
    activity_type = data.get('activityType')
    stream_description = data.get('streamDescription')

    try:
        stream_info = StreamInfo.objects.get(user=request.user)
    except StreamInfo.DoesNotExist:
        return JsonResponse({'error': 'Something wrong'}, status=502)

    if title:
        stream_info.title = title
    if activity_type:
        stream_info.activity_type = activity_type
    if stream_description:
        stream_info.stream_description = stream_description
    stream_info.save()

    return JsonResponse({'success': 'Stream info updated successfully.'}, status=200)

@csrf_exempt
@require_http_methods(["POST"])
def session(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return JsonResponse({'error': 'Both username and password are required.'}, status=400)

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
    else:
        return JsonResponse({'error': 'Invalid credentials.'}, status=400)

    return JsonResponse({'success': 'User logged successfully.'}, status=200)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_session(request):
    logout(request)
    return HttpResponse(status=200)

@csrf_exempt
@require_http_methods(["POST"])
def new_user(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    channel_name = data.get('channelName')

    if not username or not password or not channel_name:
        return JsonResponse({'error': 'Username, password and channel name are required.'}, status=400)

    if CustomUser.objects.filter(username=username).exists():
        return JsonResponse({'error': 'Username already taken.'}, status=400)

    #TODO: transactions?
    user = CustomUser.objects.create_user(username=username, password=password)
    user.save()

    channel_info = ChannelInfo(user=user, channel_name=channel_name)
    channel_info.save()

    stream_info = StreamInfo(user=user, title='Default Title', activity_type='Default Type', stream_description='Default Description')
    stream_info.save()

    return JsonResponse({'success': 'User created successfully.'}, status=200)