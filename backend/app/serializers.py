from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import School, QA, UserAccount
from .models import QA, School, Tag



class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class QASerializer(serializers.ModelSerializer):
    class Meta:
        model = QA
        # FIXME specify fields individually so that sensible data is not exposed
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        nested_data = {
            'id': data['id'],
            'recipient_school_id': data['recipient_school'],
            'question': {
                'title': data['question_title'],
                'body': data['question_body'],
                'author': data['question_author'],
            }
        }

        if data['answer_body'] is None:
            nested_data.update({'answer': None})
        else:
            nested_data.update({
                'answer': {
                    'body': data['answer_body'],
                    'author': data['answer_author'],
                    'rating': data['answer_rating'],
                }})

        return nested_data

    def to_internal_value(self, data):

        try:
            flattened_data = {
                'recipient_school_id': data['recipient_school_id'],
                'question_title': data['question']['title'],
                'question_body': data['question']['body'],
                'question_author': data['question']['author']}

            if ('answer' not in data) or (data['answer'] is None):
                flattened_data.update({
                    'answer_body': None,
                    'answer_author': None,
                    'answer_rating': None
                })
            else:
                flattened_data.update({
                    'answer_body': data['answer']['body'],
                    'answer_author': data['answer']['author'],
                    'answer_rating': data['answer']['rating']
                })

        except KeyError:
            # TODO remove if flattened structure no longer applicable
            raise ValidationError("Unable to flatten QA structure")

        return super().to_internal_value(flattened_data)


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'
