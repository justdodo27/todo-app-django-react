from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

# Create your models here.

class Task(models.Model):

    class Meta:
        verbose_name = _("Task")
        verbose_name_plural = _("Tasks")
        ordering = ['id']

    task_name = models.CharField(max_length=255, default=_('New Task'), verbose_name=_('Task Name'))
    completion = models.BooleanField(default=False, verbose_name=_('Completion'))
    author = models.ForeignKey(User, related_name='task', on_delete=models.CASCADE)

    def __str__(self):
        return self.task_name