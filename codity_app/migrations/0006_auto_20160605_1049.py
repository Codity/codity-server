# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('codity_app', '0005_auto_20160605_1037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rule',
            name='metric',
            field=models.ForeignKey(related_name=b'rules', default=b'', to='codity_app.Metric'),
        ),
    ]
