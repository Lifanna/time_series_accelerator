# Generated by Django 3.2.24 on 2024-02-14 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20240214_2118'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_superuser',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
