from .models import Task
from rest_framework import serializers

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = [
            'id',
            'task_name',
            'completion',
            'author'
        ]
        extra_kwargs = {
            'author': {'required': False}
        }

    def create(self, validated_data):
        return Task.objects.create(**validated_data, author=self.context['request'].user)