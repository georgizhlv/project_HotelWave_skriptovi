from django.db import models
from django.conf import settings
from rooms.models import Room

class Reservation(models.Model):
    user      = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    room      = models.ForeignKey(Room, on_delete=models.CASCADE)
    check_in  = models.DateField()
    check_out = models.DateField()

    def __str__(self):
        return "%s - %s (%s to %s)" % (
            self.user.username,
            self.room.name,
            self.check_in,
            self.check_out
        )


