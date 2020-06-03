from django.db import models

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


class QA(models.Model):
    recipient_school = models.ForeignKey(School, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    title = models.TextField()
    body = models.TextField()
    author = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING)

    answer = models.TextField(null=True)
    answer_author = models.ForeignKey(SchoolAccount, null=True, on_delete=models.DO_NOTHING)
