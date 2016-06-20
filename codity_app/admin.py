from django.contrib import admin

from .models import Metric, Rule

admin.site.register(Metric)
admin.site.register(Rule)