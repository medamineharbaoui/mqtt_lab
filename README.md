 IoT Dashboard	 

 
Introduction 

This project involves the development of an IoT monitoring system that 	simulates an Arduino with a DHT11 sensor to publish temperature and 	humidity data to an MQTT broker. The data is then consumed by a Node.js server, stored in a MySQL database, and visualized in real-time and historical formats using a React dashboard.  

An optional Node-RED dashboard also visualizes the real-time and historical data. The entire system is containerized using Docker, ensuring seamless 	deployment and scalability. 

 

Components 

    - Arduino with DHT11 sensor (simulated) / MQTT broker / Node.js server 

    - MySQL database 

    - React application for the dashboard 

    - Node-RED for the optional dashboard 

    - Docker and Docker Compose 

 

Approach 

Part 1: Simulation of Arduino with DHT11 Sensor 

        - Setup: Simulate an Arduino device with a DHT11 sensor that measures 	temperature and humidity. 

        - Data Publishing: Configure the simulated device to publish temperature 	and humidity data every few seconds to an MQTT topic. 

Part 2: Node.js Server 

    - MQTT Subscription: Create a Node.js application that subscribes to the same 	MQTT topic. 

    - Data Storage: Store the received data into a MySQL database. 

Part 3: React Dashboard 

    - Real-time Data: Develop a React application with two components: 

    - Gauges: Display real-time temperature and humidity data by subscribing to 	the MQTT topic. 

    - Line Charts: Retrieve and display historical data from the MySQL database 	with options to filter data by the last 24 hours or the last week. 

Optional Part: Node-RED Dashboard 

    - Dashboard Setup: Configure a Node-RED instance to visualize the data. 

    - Components: Include gauges for real-time data and line charts for the last 	24 hours of data. 

Containerization with Docker 

    - Docker Compose Configuration: Define services for Node.js, React, Node-RED, 	and MySQL in a docker-compose.yml file to run the entire application stack 	in multi-container Docker setup. 

 

System Workflow 

    1- The simulated Arduino device publishes data to the MQTT broker. 

    2- The Node.js server subscribes to the MQTT topic, processes the data, and 	stores it in the MySQL database. 

    3- The React dashboard fetches and displays real-time data and historical 	data based on user-selected filters. 

    4- The optional Node-RED dashboard provides an alternative visualization 	interface. 

 

Conclusion 

This project showcases the integration of various technologies to build a robust IoT monitoring system. The successful implementation of the system highlights the potential for similar applications in real-world scenarios where real-time and historical data monitoring is crucial. The use of Docker for containerization simplifies deployment and management, making the system highly scalable. 

 

 

 
