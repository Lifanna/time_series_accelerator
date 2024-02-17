from main import models


class ModelInstance:
    def __init__(self):
        # здесь будет инициализация объекта вашей модели
        self.model = None

    def predict(self, request_content, username, gestures_count):
        user = models.CustomUser.objects.get(username=username)

        test_series = request_content.get('time_series')
        test_data = []

        for test_series_single in test_series:
            test_data.append(
                [
                    test_series_single.get('x_acc'),
                    test_series_single.get('y_acc'),
                    test_series_single.get('z_acc'),
                    test_series_single.get('x_rot'),
                    test_series_single.get('y_rot'),
                    test_series_single.get('z_rot'),
                ]
            )

        # [
        #     [[1,2,3,4,5,6], [1,2,3,4,5,6], [1,2,3,4,5,6], [1,2,3,4,5,6]], # gesture_index=1
        #     [[1,2,3,4,5,6], [1,2,3,4,5,6], [1,2,3,4,5,6]], # gesture_index=2
        #     [[1,2,3,4,5,6], [1,2,3,4,5,6], [1,2,3,4,5,6], [1,2,3,4,5,6], [1,2,3,4,5,6], [1,2,3,4,5,6]], # gesture_index=3
        #     [[1,2,3,4,5,6], [1,2,3,4,5,6]], # gesture_index=4
        #     [[1,2,3,4,5,6], [1,2,3,4,5,6]], # gesture_index=5
        # ]

        # если меньше 10 то выдаем ошибку

        unique_gesture_indices = models.UserSeries.objects.filter(user__username=username).values_list('gesture_index', flat=True).distinct()

        if unique_gesture_indices.count() < int(gestures_count):
            return False, "Недостаточно данных для обучения"

        train_data = []

        for unique_gesture_index in unique_gesture_indices:
            result = models.UserSeries.objects.filter(
                user=user,
                gesture_index=unique_gesture_index
            ).values_list(
                'accelerometer_1', 'accelerometer_2', 'accelerometer_3',
                'hyroscope_1', 'hyroscope_2', 'hyroscope_3',
            )

            result_list = [list(item) for item in result]

            train_data.append(
                result_list
            )

        # self.model.fit(train_data)
        # self.model.predict(test_data)

        return True, ""
