from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Posts(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=60, null=True)
    synopsis = models.CharField(max_length=350, blank=True, null=True)
    text = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title
