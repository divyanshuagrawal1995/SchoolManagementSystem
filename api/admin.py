from django.contrib import admin
from .models import Choice,Question,Assignment,GradedAssignment
admin.site.register(Choice)
admin.site.register(GradedAssignment)
admin.site.register(Assignment)
admin.site.register(Question)

# Register your models here.
