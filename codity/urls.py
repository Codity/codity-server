from codity_app import views
from django import views as django_views
from django.conf import settings
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from django.views.generic import TemplateView
from codity_app.views import RuleViewSet

routes = getattr(settings, 'REACT_ROUTES', [])

router = DefaultRouter()
router.register(r'rules', views.RuleViewSet)
router.register(r'metrics', views.MetricViewSet)
#router.register(r'users', views.UserViewSet)
#router.register(r'rules', views.RuleViewSet)


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # url(r'rules', RuleViewSet.as_view(
    # #     {
    # #     'get': 'list',
    # #     'post': 'create',
    # #     'put': 'update',
    # # }
    # )),

    url(r'^(%s)/?$' % '|'.join(routes), TemplateView.as_view(template_name='index.html')),

    url('^$', views.index),

    # serve static
    url(r'^build/(?P<path>.*)$', django_views.static.serve,
        {'document_root': settings.STATIC_ROOT}),
]
