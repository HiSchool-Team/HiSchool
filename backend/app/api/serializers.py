from rest_framework import serializers

from ..models import School, QA


class SchoolSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = School
        fields = ('name',)


class QASerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = QA
        fields = ['recipient_school', 'title', 'body', 'author', 'answer', 'answer_author']
