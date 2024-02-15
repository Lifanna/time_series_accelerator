from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username or password is None:
            raise ValueError('Phone number is required field.')

        # username = self.normalize_email(username)
        user = self.model(username=username, **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, password=None, **extra_fields):
        if not username or password is None:
            raise ValueError('Required.')

        extra_fields['is_superuser'] = True
        extra_fields['is_staff'] = True

        # username = self.normalize_email(username)
        user = self.model(username=username, **extra_fields)

        user.set_password(password)
        user.save()

        return user


class CustomUser(AbstractBaseUser):
    username = models.CharField("Логин", max_length=50, unique=True)

    is_staff = models.BooleanField(default=False, verbose_name='Служебный аккаунт')

    is_active = models.BooleanField(default=True, verbose_name='Активен')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    updated_at = models.DateTimeField(auto_now=True)

    is_superuser = models.BooleanField(default=False, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    def has_perm(*args, **kwargs):
        return True

    def has_module_perms(*args, **kwargs):
        return True

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class UserSeries(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    accelerometer_1 = models.FloatField("Акселерометр 1")

    accelerometer_2 = models.FloatField("Акселерометр 2")

    accelerometer_3 = models.FloatField("Акселерометр 3")

    hyroscope_1 = models.FloatField("Гироскоп 1")

    hyroscope_2 = models.FloatField("Гироскоп 2")

    hyroscope_3 = models.FloatField("Гироскоп 3")

    def __str__(self):
        return str(self.pk) + " / " + self.user.username

    class Meta:
        verbose_name = 'Временные ряды пользователя'
        verbose_name_plural = 'Временные ряды пользователей'
