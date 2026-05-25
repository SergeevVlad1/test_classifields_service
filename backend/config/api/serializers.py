from rest_framework import serializers

class BrowseRequestSerializer(serializers.Serializer):
    url = serializers.URLField(required=True, allow_blank=False)
