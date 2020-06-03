from django.db import models
import json

# Create your models here.
from django.db import models


class School(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


# FIXME we probably should be relying on django built-in account system
# the following is just for testing purposes
class Account(models.Model):
    email = models.EmailField
    name = models.CharField(max_length=255)

    class Meta:
        abstract = True


class UserAccount(Account):
    pass


class SchoolAccount(Account):
    pass


# FIXME this is just to show that the database works but does not implement
# any school separation
class QA(models.Model):
    question_title = models.TextField()
    question_body = models.TextField()
    question_author = models.CharField(max_length=255)

    answer_body = models.TextField(null=True, default=None)
    answer_author = models.CharField(max_length=255, null=True, default=None)
    answer_rating = models.IntegerField(null=True,
                                        default=None)  # FIXME the avg rating should be calculated across multiple ratings


