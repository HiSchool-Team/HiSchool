from time import strftime

import django
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    # FIXME Default should be false in both but left true for development purposes
    is_user = models.BooleanField(default=False)
    is_school = models.BooleanField(default=False)

    @classmethod
    def default(cls):
        return User.objects.get(id=2)


class Tag(models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50,
                            choices=[('Type', 'Type'),
                                     ('Extracurricular', 'Extracurricular'),
                                     ('Amenities', 'Amenities'),
                                     ('Other', 'Other')])
    sub_type = models.CharField(max_length=50,
                                choices=[('General', 'General'),
                                         ('Sports', 'Sports'),
                                         ('Science', 'Science'),
                                         ('Art', 'Art')])

    def __str__(self):
        return self.name


class School(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=User.default().id)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=1000, default='')
    motto = models.CharField(max_length=200, null=True)
    website = models.URLField(null=True)
    facebook = models.URLField(null=True)
    twitter = models.URLField(null=True)
    video = models.URLField(null=True)
    calendar = models.URLField(null=True)
    map = models.URLField(null=True)

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
    img_link = models.URLField(null=True, max_length=400)

    # TODO consider removing tags field entirely
    ##tags = models.ManyToManyField(Tag, blank=True)
    prioritized_tags = models.ManyToManyField(Tag, blank=True, through='PrioritizedTag')

    def __str__(self):
        return self.name


# https://docs.djangoproject.com/en/3.0/topics/db/models/#extra-fields-on-many-to-many-relationships
class PrioritizedTag(models.Model):
    class Meta:
        unique_together = ['school', 'tag']

    school = models.ForeignKey(School, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    priority = models.IntegerField()


# FIXME this is just to show that the database works but does not implement any school separation
class QA(models.Model):
    recipient_school = models.ForeignKey(School, on_delete=models.CASCADE)
    question_title = models.TextField()
    question_body = models.TextField()
    question_author = models.CharField(max_length=255)
    question_created_at = models.DateTimeField(auto_now_add=True)

    answer_body = models.TextField(null=True, default=None)
    answer_author = models.CharField(max_length=255, null=True, default=None)
    answer_rating = models.IntegerField(null=True,
                                        default=None)  # FIXME the avg rating should be calculated across multiple ratings
    answer_created_at = models.DateTimeField(auto_now=True)


class ApplicantAccount(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    saved_schools = models.ManyToManyField(School, blank=True)
    saved_qas = models.ManyToManyField(QA, blank=True)

    @classmethod
    def default(cls):
        return ApplicantAccount.objects.get(user_id=2)


class SchoolAccount(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    school = models.OneToOneField(School, on_delete=models.DO_NOTHING, null=True)


# Automatically generate user token upon user creation
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
