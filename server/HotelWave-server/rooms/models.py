from django.db import models

class Room(models.Model):
    ROOM_TYPES = [
        ('Basic', 'Basic'),
        ('Deluxe', 'Deluxe'),
        ('Suite', 'Suite'),
    ]

    name  = models.CharField(max_length=100)
    type  = models.CharField(max_length=10, choices=ROOM_TYPES)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.type})"



