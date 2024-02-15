from main import models


class ModelInstance:
    def __init__(self):
        # здесь будет инициализация объекта вашей модели
        self.model = None

    def predict(self, test_data, username):
        user = models.CustomUser.objects.get(username=username)

        train_data = models.UserSeries.objects.filter(
            user=user
        ).values(
            'accelerometer_1', 'accelerometer_2', 'accelerometer_3',
            'hyroscope_1', 'hyroscope_2', 'hyroscope_3'
        )

        # self.model.fit(train_data)
        # self.model.predict(test_data)

        return True
