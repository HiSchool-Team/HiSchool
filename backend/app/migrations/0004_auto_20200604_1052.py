# Generated by Django 3.0.6 on 2020-06-04 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_auto_20200604_0006'),
    ]

    operations = [
        migrations.AlterField(
            model_name='school',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
