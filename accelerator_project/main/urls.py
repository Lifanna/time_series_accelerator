"""accelerator_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from main import views


urlpatterns = [
    path('', views.index, name="index"),
    path('test_gesture', views.test_gesture, name="test_gesture"),
    path('login', views.CustomLoginView.as_view(), name="login"),
    path('logout', views.CustomLogoutView.as_view(), name="logout"),
    path('register', views.CustomRegistrationView.as_view(), name="register"),

    path('user_series/new', views.UserSeriesCreateAPIView.as_view()),
    path('user_series/test', views.UserSeriesTestAPIView.as_view()),
]
