from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Posts

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class PostsSerializer(serializers.ModelSerializer):
    author = UsersSerializer(read_only=True)

    class Meta:
        model = Posts
        fields = ['title', 'synopsis', 'text', 'author', 'created_at']
    
