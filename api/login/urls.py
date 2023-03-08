from django.urls import path

from . import views

app_name = 'login'

urlpatterns = [
    path('register/', views.register, name='user'),
    path('login/', views.login_view, name='user'),
    path('logout/', views.logout_view, name='user'),
    path('lol/', views.lol_view, name='user'),
]