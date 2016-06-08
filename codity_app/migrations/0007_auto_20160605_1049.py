# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('codity_app', '0006_auto_20160605_1049'),
    ]

    operations = [
        migrations.AlterField(
            model_name='metric',
            name='name',
            field=models.CharField(default=b'', max_length=100),
        ),
        migrations.AlterField(
            model_name='rule',
            name='metric',
            field=models.ForeignKey(related_name=b'rules', to='codity_app.Metric'),
        ),
    ]
