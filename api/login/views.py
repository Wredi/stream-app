from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomUser, ChannelInfo, StreamInfo
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout

@csrf_exempt
def logout_view(request):
    logout(request)
    return HttpResponse(status=200)

@csrf_exempt
def all_active_streams(request):
    streams = StreamInfo.objects.filter(is_active=True)
    data = [{**i.get_json_data(), **{"userId": i.user.id}} for i in streams]
    return JsonResponse(data, status=201, safe=False)

@csrf_exempt
def curr_user_stream_data(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not logged'}, status=401)

    try:
        stream_info = StreamInfo.objects.get(user=request.user)
    except StreamInfo.DoesNotExist:
        return JsonResponse({'error': 'Something wrong'}, status=502)

    return JsonResponse(stream_info.get_json_data(), status=201)


@csrf_exempt
def curr_user_channel_data(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not logged'}, status=401)

    try:
        channel_info = ChannelInfo.objects.get(user=request.user)
    except ChannelInfo.DoesNotExist:
        return JsonResponse({'error': 'Something wrong'}, status=502)

    return JsonResponse(channel_info.get_json_data(), status=201)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        print(request)
        print(request.body)
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

        return JsonResponse({'success': 'User logged successfully.'}, status=201)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        print(request)
        print(request.body)
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

        return JsonResponse({'success': 'User created successfully.'}, status=201)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)