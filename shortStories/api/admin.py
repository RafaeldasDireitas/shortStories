from django.contrib import admin
from .models import Posts
# Register your models here.

class PostsAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')  # include 'created_at' in list_display

admin.site.register(Posts, PostsAdmin)