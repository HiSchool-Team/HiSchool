from django.contrib import admin

# Register your models here.
from .models import School, QA, UserAccount, User, Tag

admin.site.register(School)
admin.site.register(QA)
admin.site.register(User)
admin.site.register(UserAccount)
admin.site.register(Tag)
