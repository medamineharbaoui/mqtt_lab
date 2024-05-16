#!/bin/bash

# Wait for MySQL to start
until mysql -h mysql -u root -p12345678 -e ";" 2>/dev/null; do
    echo "Waiting for MySQL to start..."
    sleep 2
done

# Grant privileges to the 'harbaoui' user from any host
mysql -h mysql -u root -p12345678 -e "USE iot_data; GRANT ALL PRIVILEGES ON *.* TO 'harbaoui'@'%' IDENTIFIED BY '12345678'; FLUSH PRIVILEGES;"

echo "MySQL setup completed."
