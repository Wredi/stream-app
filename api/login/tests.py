from django.test import Client, TestCase
from django.urls import reverse

from .models import CustomUser

class CurrUserChannelDataTests(TestCase):
    def test_user_not_logged(self):
        response = self.client.get(reverse('login:channel_data'))
        self.assertEqual(response.status_code, 401)

    def test_user_logged_but_channel_data_dont_exist(self):
        username = 'test_user'
        password = '12345'
        test_user = CustomUser.objects.create_user(username=username, password=password)
        test_user.save()
        self.assertEqual(self.client.login(username=username, password=password), True)
        response = self.client.get(reverse('login:channel_data'))
        self.assertEqual(response.status_code, 502)