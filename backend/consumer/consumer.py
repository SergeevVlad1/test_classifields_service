import os
import time
import json
import pika
import sys
from selenium import webdriver

RABBITMQ_HOST = os.environ.get('RABBITMQ_HOST', 'rabbitmq')
RABBITMQ_PORT = int(os.environ.get('RABBITMQ_PORT', 5672))
RABBITMQ_USER = os.environ.get('RABBITMQ_USER', 'guest')
RABBITMQ_PASS = os.environ.get('RABBITMQ_PASS', 'guest')
RABBITMQ_QUEUE = os.environ.get('RABBITMQ_QUEUE', 'avito_browse_queue')
SELENIUM_HUB_URL = os.environ.get('SELENIUM_HUB_URL', 'http://selenium-hub:4444/wd/hub')

def process_message(ch, method, properties, body):
    print(f"[*] Received new job: {body.decode()}", flush=True)
    try:
        data = json.loads(body.decode())
        url = data.get('url')
        if not url:
            print("[!] Error: No URL provided in message.", flush=True)
            ch.basic_ack(delivery_tag=method.delivery_tag)
            return

        print(f"[*] Opening browser to fetch: {url}", flush=True)
        
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        
        driver = webdriver.Remote(
            command_executor=SELENIUM_HUB_URL,
            options=options
        )
        
        try:
            driver.set_page_load_timeout(30)
            driver.get(url)
            
            print(f"[*] Successfully loaded: {driver.title}", flush=True)
            page_source = driver.page_source
            print(f"===== PAGE SOURCE FOR {url} =====", flush=True)
            print(page_source, flush=True)
            print(f"==================================", flush=True)
        finally:
            driver.quit()
            
        print("[*] Completed task successfully.", flush=True)
    except Exception as e:
        print(f"[!] Error processing task: {str(e)}", flush=True)
    
    ch.basic_ack(delivery_tag=method.delivery_tag)

def main():
    print("[*] Consumer starting, waiting for connection...", flush=True)
    
    credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASS)
    parameters = pika.ConnectionParameters(
        host=RABBITMQ_HOST,
        port=RABBITMQ_PORT,
        credentials=credentials,
        connection_attempts=10,
        retry_delay=5
    )
    
    connection = None
    for attempt in range(1, 11):
        try:
            print(f"[*] Attempting to connect to RabbitMQ (attempt {attempt}/10)...", flush=True)
            connection = pika.BlockingConnection(parameters)
            print("[*] Successfully connected to RabbitMQ!", flush=True)
            break
        except Exception as e:
            print(f"[!] Connection failed: {e}. Retrying in 5 seconds...", flush=True)
            time.sleep(5)
            
    if not connection:
        print("[!] Fatal: Could not connect to RabbitMQ after 10 attempts.", flush=True)
        sys.exit(1)
        
    channel = connection.channel()
    channel.queue_declare(queue=RABBITMQ_QUEUE, durable=True)
    
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=RABBITMQ_QUEUE, on_message_callback=process_message)
    
    print(f"[*] Waiting for messages in queue '{RABBITMQ_QUEUE}'...", flush=True)
    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        print("[*] Stopping consumer...", flush=True)
        channel.stop_consuming()
    connection.close()

if __name__ == '__main__':
    main()
