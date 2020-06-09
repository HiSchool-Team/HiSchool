# Generated by Django 3.0.6 on 2020-06-09 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20200609_1542'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('type', models.CharField(choices=[('TY', 'Type'), ('EX', 'Extracurricular'), ('AM', 'Amenities'), ('OT', 'Other')], max_length=50)),
            ],
        ),
    ]
