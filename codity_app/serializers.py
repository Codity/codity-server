from rest_framework import serializers
from codity_app.models import Rule, Metric
# from django.contrib.auth.models import User


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

    # Теперь у каждой метрики будет массив с ключами правил
    rules = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )

    class Meta:
        model = Metric
        fields = ('name', 'unit', 'rules')


class RuleSerializer(serializers.HyperlinkedModelSerializer):

    # Если хочешь вывести объекты Metric целиком то делаешь так:
    # metric = MetricSerializer(
    #     many=False,
    #     read_only=False,
    # )

    # Если хочешь вывести их по ключам то делаешь так:
    metric = serializers.PrimaryKeyRelatedField(
        many=False,
        read_only=False,
        # При этом кверисет выбирает тот список метрик, к которым может быть прилинковано правило, то есть те, которые
        # выпадают в селекторе вот тут в форме внизу http://127.0.0.1:8000/api/rules/
        queryset=Metric.objects.all(),
    )

    class Meta:
        model = Rule
        fields = ('id', 'metric', 'value', 'sign', 'action')


    # P.S. я включил тебе админку, чтобы по http://127.0.0.1:8000/admin/ можно было смотреть и менять данные в моделях =)
