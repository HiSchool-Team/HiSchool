from django.contrib import admin

# Register your models here.
from .models import School, QA, UserAccount, SchoolAccount, Tag

admin.site.register(School)
admin.site.register(QA)
admin.site.register(UserAccount)
admin.site.register(SchoolAccount)
admin.site.register(Tag)
