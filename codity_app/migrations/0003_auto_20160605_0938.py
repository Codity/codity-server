# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('codity_app', '0002_auto_20160605_0933'),
    ]

    operations = [
        migrations.CreateModel(
            name='Metric',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('unit', models.CharField(max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterField(
            model_name='rule',
            name='metric',
            field=models.ForeignKey(related_name=b'rules', to='codity_app.Metric'),
        ),
        migrations.AlterUniqueTogether(
            name='rule',
            unique_together=set([('metric', 'sign', 'action')]),
        ),
    ]
