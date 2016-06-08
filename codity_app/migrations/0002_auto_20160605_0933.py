# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('codity_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rule',
            name='metric',
            field=models.CharField(max_length=100, choices=[(b'CPU', b'CPU'), (b'RAM', b'RAM'), (b'HDD', b'HDD')]),
        ),
        migrations.DeleteModel(
            name='Metric',
        ),
        migrations.AlterUniqueTogether(
            name='rule',
            unique_together=set([('metric', 'value', 'action')]),
        ),
    ]
