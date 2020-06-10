from time import strftime

from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class User(AbstractUser):
    # FIXME Default should be false in both but left true for development purposes
    is_user = models.BooleanField(default=True)
    is_school = models.BooleanField(default=True)


class School(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=1000, default='')
    student_satisfaction = models.DecimalField(
        default=0,
        max_digits=2,
        decimal_places=1,
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    parent_satisfaction = models.DecimalField(
        default=0,
        max_digits=2,
        decimal_places=1,
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    img_src = models.ImageField(upload_to=strftime('photos/%Y/%m/%d'), null=True)

    def __str__(self):
        return self.name


# FIXME this is just to show that the database works but does not implement
# any school separation
class QA(models.Model):
    recipient_school = models.ForeignKey(School, on_delete=models.CASCADE)
    question_title = models.TextField()
    question_body = models.TextField()
    question_author = models.CharField(max_length=255)

    answer_body = models.TextField(null=True, default=None)
    answer_author = models.CharField(max_length=255, null=True, default=None)
    answer_rating = models.IntegerField(null=True,
                                        default=None)  # FIXME the avg rating should be calculated across multiple ratings


class UserAccount(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    saved_schools = models.ManyToManyField(School, blank=True)
    saved_qas = models.ManyToManyField(QA, blank=True)


