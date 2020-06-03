from django.contrib import admin

# Register your models here.
from .models import School, Question, UserAccount, SchoolAccount

admin.site.register(School)
admin.site.register(Question)
admin.site.register(UserAccount)
admin.site.register(SchoolAccount)
