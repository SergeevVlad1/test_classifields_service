import json
import pika
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import BrowseRequestSerializer

class BrowseView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BrowseRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        target_url = serializer.validated_data['url']
        
        try:
            credentials = pika.PlainCredentials(settings.RABBITMQ_USER, settings.RABBITMQ_PASS)
            parameters = pika.ConnectionParameters(
                host=settings.RABBITMQ_HOST,
                port=settings.RABBITMQ_PORT,
                credentials=credentials,
                connection_attempts=3,
                retry_delay=2
            )
            connection = pika.BlockingConnection(parameters)
            channel = connection.channel()
            
            channel.queue_declare(queue=settings.RABBITMQ_QUEUE, durable=True)
            
            message_body = json.dumps({'url': target_url})
            channel.basic_publish(
                exchange='',
                routing_key=settings.RABBITMQ_QUEUE,
                body=message_body,
                properties=pika.BasicProperties(
                    delivery_mode=2, 
                    content_type='application/json'
                )
            )
            connection.close()
            
            return Response({'status': 'queued', 'url': target_url}, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            return Response(
                {'error': 'Failed to connect to task queue', 'details': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
