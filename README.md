# Fall_IoT_NodeJS
## IoT based smart power meter with safety features
### This project involved creating sensors to monitor power flowing through an appliance to notify users on the device's power usage. The edge device also includes temperature sensors that can be used to monitor components of an applicance such as the heat exchange of a fridge so that the deivce can be powered off incase of a fire or malfunction.
### The device is also capable of detecting if a user has received a shock from the appliance by checking the difference between the incoming and outgoing current and is able to shut off the appliance if needed.
This is a NodeJS webserver that serves pages as well as handles data from sensors.
It works with MongoDB to store user and sensor data.
mongod --dbpath D:\Docs\mongodb\IoT-proj-data

## Future work
Machine learning algorithms can be used with training data to predict when a device is going to fail as well as to schedulde maintenance.
