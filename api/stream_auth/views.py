from django.http import HttpResponse
from django.contrib.auth import authenticate

def authorize(request):
    if request.method == "POST":
        data = request.POST
        password = data.get("key")
        name = data.get("name")
        user = authenticate(request, username=name, password=password)
        if user is not None:
            stram_info = user.streaminfo
            stram_info.is_active = True
            stram_info.save()
            return HttpResponse(status=200)
            
    return HttpResponse(status=403)

def stream_done(request):
    if request.method == "POST":
        data = request.POST
        password = data.get("key")
        name = data.get("name")
        user = authenticate(request, username=name, password=password)
        if user is not None:
            stram_info = user.streaminfo
            stram_info.is_active = False
            stram_info.save()
            return HttpResponse(status=200)
            
    return HttpResponse(status=403)