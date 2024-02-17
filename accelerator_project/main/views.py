from django.shortcuts import render
from django.http import Http404
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import reverse_lazy
from django.contrib import messages
from . import models, forms, serializers
from django.views import generic
from django.contrib.auth.decorators import login_required
from rest_framework import views as drf_views
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from main.model_instance import ModelInstance
from django.db.models import Max


@login_required
def index(request):
    return render(request, "main/index.html")


def test_gesture(request):
    username = request.GET.get("username")

    if (not models.CustomUser.objects.filter(username=username).exists()):
        raise Http404("Пользователь не найден")

    return render(request, "main/test_gesture.html", context={
        'username': username,
    })


class CustomLoginView(LoginView):
    redirect_authenticated_user = True
    template_name='main/login.html'

    def get_success_url(self):
        return reverse_lazy('index')

    def form_invalid(self, form):
        messages.error(self.request,'Invalid username or password')
        return self.render_to_response(self.get_context_data(form=form))


class CustomLogoutView(LogoutView):
    next_page = reverse_lazy('login')


class CustomRegistrationView(generic.CreateView):
    template_name = "main/register.html"
    model = models.CustomUser
    form_class = forms.CustomUserRegistrationForm
    success_url = '/login'


# создание обучающей выборки
class UserSeriesCreateAPIView(drf_views.APIView):
    def post(self, request, format=None):
        data = request.data.get("time_series")
        username = request.data.get("username")

        created_instances = []

        user = models.CustomUser.objects.get(username=username)

        max_gesture_index = models.UserSeries.objects.filter(user=user).aggregate(Max('gesture_index'))['gesture_index__max'] or 0

        for entry in data:
            instance = models.UserSeries.objects.create(
                user=user,
                accelerometer_1=entry['x_acc'],
                accelerometer_2=entry['y_acc'],
                accelerometer_3=entry['z_acc'],
                hyroscope_1=entry['x_rot'],
                hyroscope_2=entry['y_rot'],
                hyroscope_3=entry['z_rot'],
                gesture_index=max_gesture_index + 1,
            )
            created_instances.append(instance)

        return Response(status=status.HTTP_201_CREATED)


# создание тестовой выборки
class UserSeriesTestAPIView(drf_views.APIView):
    def post(self, request, format=None):
        data = request.data

        username = request.data.get("username")
        gestures_count = request.data.get("gestures_count")

        for entry in data:
            pass
            # instance = 
            #     user=models.CustomUser.objects.get(username=entry['username']),
            #     accelerometer_1=entry['x_acc'],
            #     accelerometer_2=entry['y_acc'],
            #     accelerometer_3=entry['z_acc'],
            #     hyroscope_1=entry['x_rot'],
            #     hyroscope_2=entry['y_rot'],
            #     hyroscope_3=entry['z_rot']
            # created_instances.append(instance)

        success = False
        model_instance = ModelInstance()
        success, status_text = model_instance.predict(data, username, gestures_count)

        if success == True and status_text == "":
            return Response(status=status.HTTP_200_OK)
        elif success == False and status_text == "Недостаточно данных для обучения":
            return Response({"message": status_text}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
