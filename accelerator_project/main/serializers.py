from rest_framework import serializers
from . import models


class UserSeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserSeries
        fields = ['user', 'accelerometer_1', 'accelerometer_2', 'accelerometer_3', 'hyroscope_1', 'hyroscope_2', 'hyroscope_3']
