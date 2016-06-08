# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('codity_app', '0003_auto_20160605_0938'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rule',
            name='metric',
            field=models.ForeignKey(related_name=b'metric', to='codity_app.Metric'),
        ),
    ]
