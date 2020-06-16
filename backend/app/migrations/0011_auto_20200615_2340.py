# Generated by Django 3.0.6 on 2020-06-15 23:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_auto_20200614_1651'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='school',
            name='tags',
        ),
        migrations.AlterField(
            model_name='school',
            name='img_src',
            field=models.ImageField(null=True, upload_to='photos/2020/06/15'),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_school',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_user',
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name='PrioritizedTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priority', models.IntegerField()),
                ('school', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.School')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Tag')),
            ],
        ),
        migrations.AddField(
            model_name='school',
            name='prioritized_tags',
            field=models.ManyToManyField(blank=True, through='app.PrioritizedTag', to='app.Tag'),
        ),
    ]
