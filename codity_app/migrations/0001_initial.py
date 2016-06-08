# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-16 22:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Metric',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('unit', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Rule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.IntegerField()),
                ('sign', models.CharField(choices=[(b'less', b'less'), (b'more', b'more')], max_length=100)),
                ('action', models.CharField(choices=[(b'sell', b'sell'), (b'buy', b'buy')], max_length=100)),
                ('metric', models.ForeignKey(default=b'', on_delete=django.db.models.deletion.CASCADE, to='codity_app.Metric')),
            ],
        ),
    ]
