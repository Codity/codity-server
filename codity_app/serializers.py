from rest_framework import serializers
from codity_app.models import Rule, Metric
#from django.contrib.auth.models import User


'''class SnippetSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    highlight = serializers.HyperlinkedIdentityField(view_name='snippet-highlight', format='html')

    class Meta:
        model = Snippet
        fields = ('url', 'highlight', 'owner',
                  'title', 'code', 'linenos', 'language', 'style')
                  
class UserSerializer(serializers.HyperlinkedModelSerializer):
    snippets = serializers.HyperlinkedRelatedField(queryset=Snippet.objects.all(), view_name='snippet-detail', many=True)

    class Meta:
        model = User
        fields = ('url', 'username', 'snippets')'''

'''

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ('order', 'title', 'duration')

class AlbumSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ('album_name', 'artist', 'tracks')

'''

class MetricSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Metric
        fields = ('name', 'unit')


class RuleSerializer(serializers.HyperlinkedModelSerializer):
    metric = MetricSerializer(read_only=True)

    class Meta:
        model = Rule
        fields = ('id', 'metric', 'value', 'sign', 'action')