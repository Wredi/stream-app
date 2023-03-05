from django.urls import path

from . import views

app_name = 'login'

urlpatterns = [
    path('user/', views.addUser, name='add'),
    path('users/', views.getAllUsers, name='user'),
    path('<str:userId>/', views.getUserById, name='user'),
    path('user/<str:username>', views.getUserByNickname, name='user'),
]