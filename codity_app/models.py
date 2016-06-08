# -*- coding: utf-8 -*-

from django.db import models

'''LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())'''

METRIC_CHOICES = (('CPU', 'CPU'), ('RAM','RAM'), ('HDD','HDD'))
#SIGN_CHOICES = ((1,'<'), (2,'>'))
SIGN_CHOICES = (('less', 'less'), ('more', 'more'))
ACTION_CHOICES = (('sell', 'sell'), ('buy', 'buy'))


class Metric(models.Model):
    name = models.CharField(max_length=100, unique=True)
    unit = models.CharField(max_length=100)


class Rule(models.Model):
    metric = models.ForeignKey(Metric, related_name='rules')
    #metric = models.CharField(choices=METRIC_CHOICES, max_length=100)
    value = models.IntegerField()
    sign = models.CharField(choices=SIGN_CHOICES, max_length=100)
    action = models.CharField(choices=ACTION_CHOICES, max_length=100)

    class Meta:
        unique_together = ('metric', 'sign', 'action')



'''class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(choices=LANGUAGE_CHOICES,
                                default='python',
                                max_length=100)
    style = models.CharField(choices=STYLE_CHOICES,
                             default='friendly',
                             max_length=100)
    owner = models.ForeignKey('auth.User', related_name='snippets')
    highlighted = models.TextField()

    class Meta:
        ordering = ('created',)

    def save(self, *args, **kwargs):
        """
        Use the `pygments` library to create a highlighted HTML
        representation of the code snippet.
        """
        lexer = get_lexer_by_name(self.language)
        linenos = self.linenos and 'table' or False
        options = self.title and {'title': self.title} or {}
        formatter = HtmlFormatter(style=self.style, linenos=linenos,
                                  full=True, **options)
        self.highlighted = highlight(self.code, lexer, formatter)
        super(Snippet, self).save(*args, **kwargs)

        # limit the number of instances retained
        snippets = Snippet.objects.all()
        if len(snippets) > 100:
            snippets[0].delete()'''

