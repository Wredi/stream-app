from django.urls import path

from . import views

app_name = 'webapi'

urlpatterns = [
    path('users/new/', views.new_user, name='new_user'),

    path('post-session/', views.session, name='session'),
    path('delete-session/', views.delete_session, name='delete_session'),
    path('session/', views.is_user_logged, name='is_user_logged'),

    path('users/me/channel/', views.curr_user_channel_data, name='channel_data'),
    path('users/me/channel-update/', views.curr_user_channel_update, name='update_channel'),

    path('users/me/stream/', views.curr_user_stream_data, name='stream_data'),
    path('users/me/stream-update/', views.curr_user_stream_update, name='update_stream'),

    path('streams/active/', views.all_active_streams, name='all_streams'),
    path('users/<str:username>/stream', views.stream_data_by_username, name='stream_data_by_username'),
]