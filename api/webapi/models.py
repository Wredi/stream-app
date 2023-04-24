from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, username):
        if not email:
            raise ValueError('Users must have an username')

        user = self.model(
            email=email, username=username 
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, username):
        user = self.create_user(
            email,
            password,
            username
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.CharField(max_length=255, unique=True)

    created_date = models.DateTimeField(default=timezone.now, blank=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = CustomUserManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class ChannelInfo(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    profile_description = models.CharField(max_length=1024)

    def get_json_data(self):
        return {'profileDescription': self.profile_description}

class StreamInfo(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    title = models.CharField(max_length=255)
    activity_type = models.CharField(max_length=255)
    stream_description = models.CharField(max_length=1024)
    is_active = models.BooleanField(default=False)

    def get_json_data(self):
        return {'title': self.title, 'activityType': self.activity_type, 'streamDescription': self.stream_description}
