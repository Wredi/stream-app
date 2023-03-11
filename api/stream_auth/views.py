from django.http import HttpResponse
from django.contrib.auth import authenticate

def authorize(request):
    if request.method == "POST":
        data = request.POST
        password = data.get("key")
        name = data.get("name")
        user = authenticate(request, username=name, password=password)
        if user is not None:
            return HttpResponse(status=200)
            
    return HttpResponse(status=403)