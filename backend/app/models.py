from time import strftime

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


# Create your models here.

class School(models.Model):
    id = models.AutoField(primary_key=True)
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


class Question(models.Model):
    recipient = models.ForeignKey(School, on_delete=models.CASCADE)
    text = models.TextField()
