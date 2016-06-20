# from django.contrib.auth.models import User
# from rest_framework import permissions
# from rest_framework import renderers
from rest_framework import viewsets
# from rest_framework.decorators import detail_route, list_route
# from rest_framework.response import Response
from codity_app.models import Rule, Metric
# from codity_app.permissions import IsOwnerOrReadOnly
from codity_app.serializers import RuleSerializer, MetricSerializer
from django.shortcuts import render_to_response


# from rest_framework.decorators import api_view
# from rest_framework import status


'''class SnippetViewSet(viewsets.ModelViewSet):
    """
    This endpoint presents code snippets.

    The `highlight` field presents a hyperlink to the highlighted HTML
    representation of the code snippet.

    The **owner** of the code snippet may update or delete instances
    of the code snippet.

    Try it yourself by logging in as one of these four users: **amy**, **max**,
    **jose** or **aziz**.  The passwords are the same as the usernames.
    """
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    @detail_route(renderer_classes=(renderers.StaticHTMLRenderer,))
    def highlight(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)'''
    
'''class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This endpoint presents the users in the system.

    As you can see, the collection of snippet instances owned by a user are
    serialized using a hyperlinked representation.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer'''


class MetricViewSet(viewsets.ModelViewSet):
    queryset = Metric.objects.all()
    serializer_class = MetricSerializer


class RuleViewSet(viewsets.ModelViewSet):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer

    # def create(self, request, *args, **kwargs):
    #     if(проверка на уникальность):
    #         throw ObjectExistsException()
    #     return super(RuleViewSet, self).create(request, *args, **kwargs)

    '''def create(self, request):
        serializer = RuleSerializer(data=request.data)

        metric = request.data.get('metric')
        sign = request.data.get('sign')
        value = request.data.get('value')
        action = request.data.get('action')

        try:
            instance = Rule.objects.get(metric=metric, value=value, sign=sign, action=action)
        except Rule.DoesNotExist:
            instance = None

        if serializer.is_valid():
            if instance is None:
                new_instance = serializer.save()

                return Response({
                    'id': new_instance.id
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    'message': 'Similar record in database already exists.',
                    'pk': instance.pk
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)'''


def index(request):

    return render_to_response('index.html')

'''def users(request):

    return render_to_response('index.html')'''

'''def about(request):

    return render_to_response('index.html')
'''''
