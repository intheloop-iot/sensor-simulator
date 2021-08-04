require('dotenv').config({ path: './.env' });

var mqtt = require('mqtt');
var cron = require('node-cron');

const client = mqtt.connect({
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
});

client.on('connect', function () {    
    cron.schedule('*/15 * * * * * * *', () => {
    console.log('>> running routine...');
        
        let sensorValue = Math.floor((Math.random() * 1500) + 200);
        sensorValue = JSON.stringify(sensorValue);
        console.log(sensorValue);
        
        client.publish('sensor-simulation-iot', sensorValue, function (err) {
            if (!err) { 
                console.log(">> message published...");
            }
        });
        // client.end();
    });
});
