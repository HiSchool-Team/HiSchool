from django.db import models

# Create your models here.
from django.db import models


class School(models.Model):
    name = models.CharField(max_length=200)


class Question(models.Model):
    recipient = models.ForeignKey(School, on_delete=models.CASCADE)
    text = models.TextField()
