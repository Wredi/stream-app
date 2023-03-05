from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
import json

from .models import User

@csrf_exempt
def getUserById(request, userId):
    user = get_object_or_404(User, pk=userId)
    data = serialize("json", user, fields=('username', 'password'))
    return HttpResponse(data, content_type="application/json")

@csrf_exempt
def addUser(request):
    users = User.objects.all()
    found= False

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    username = body["username"]
    password = body["password"]

    for user in users:
        if user.get_username() == body["username"]:
            found = True
    if found == False:
        newUser = User.objects.create(username = username, password = password)
        newUser.save()
        return HttpResponse(newUser)
    else:
        return HttpResponse(0)

@csrf_exempt
def getAllUsers(request):
    user = User.objects.all()
    data = serialize("json", user, fields=('username', 'password'))
    return  HttpResponse(data, content_type="application/json")            

@csrf_exempt
def getUserByNickname(request, username):
    users = User.objects.all()
    found = False
    thisUser:User

    for user in users:
        if username == user.get_username():
            thisUser = user
            found = True
            break
    
    if found:
        json_str = json.dumps({"username": thisUser.get_username(), "password": thisUser.get_password()})
        return HttpResponse(json_str, content_type="application/json")
    else:
        return HttpResponse(0)

