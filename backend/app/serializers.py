from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import School, QA, ApplicantAccount, User, SchoolAccount, PrioritizedTag
from .models import QA, School, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class PrioritizedTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrioritizedTag
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
                'created_at': data['question_created_at']
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
                    'created_at': data['answer_created_at']
                }})

        return nested_data

    def to_internal_value(self, data):

        try:
            flattened_data = {
                'recipient_school': data['recipient_school_id'],
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


class ApplicantAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicantAccount
        fields = '__all__'


class UserRegisterSerializer(RegisterSerializer):

    def custom_signup(self, request, user):
        try:
            if request.data['is_user']:
                user.is_user = True
                user.save()
                ApplicantAccount.objects.create(user=user)
            elif request.data['is_school']:
                user.is_school = True
                user.save()
                SchoolAccount.objects.create(user=user)
            else:
                raise ValidationError("user account type is required but has not been specified")

        except KeyError as err:
            raise ValidationError(str(err))


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_school', 'is_user']
