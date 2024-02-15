from django.contrib.auth.forms import UserCreationForm
from main import models


class CustomUserRegistrationForm(UserCreationForm):
    class Meta:
        model = models.CustomUser
        fields = (
            'username',
        )
