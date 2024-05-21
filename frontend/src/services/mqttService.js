import mqtt from 'mqtt';

const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

const connect = (onMessage) => {
  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('Tempdata');
  });

  client.on('message', (topic, message) => {
    if (topic === 'Tempdata') {
      const dataString = message.toString();
      const [temperature, humidity] = dataString.split(',').map(Number);
      onMessage({ temperature, humidity });
    }
  });
};

const mqttService = { connect };

export default mqttService;
