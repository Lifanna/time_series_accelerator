# Generated by Django 3.2.24 on 2024-02-14 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userseries',
            options={'verbose_name': 'Временные ряды пользователя', 'verbose_name_plural': 'Временные ряды пользователей'},
        ),
        migrations.AlterField(
            model_name='customuser',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='Активен'),
        ),
    ]
