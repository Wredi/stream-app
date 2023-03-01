from django.shortcuts import render

from django.http import HttpResponse

def index(request):
    if request.method == "POST":
        data = request.POST
        key = data.get("key")
        print(key, "\t", data.get("name"))
        if key == "witaj":
            return HttpResponse("[cool][witaj]", status=200)
    return HttpResponse(status=403)