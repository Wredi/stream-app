from django.urls import path

from . import views

urlpatterns = [
    path('authorize/', views.authorize, name='authorize'),
    path('stream-done/', views.stream_done, name='stream_done'),
]