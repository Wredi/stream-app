from django.urls import path

from . import views

app_name = 'login'

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('channel-data/', views.curr_user_channel_data, name='channel_data'),
    path('stream-data/', views.curr_user_stream_data, name='stream_data'),
]