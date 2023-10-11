const mqtt = require('mqtt');

exports.publish = async (req, res) => { 
    let client = mqtt.connect({
        host: process.env.MQTT_HOST ,
        port: process.env.MQTT_PORT
    })
    const topic = 'LAZADA_WFM'
    const message =  "{"
                    +"\"messageId\": \"1jdi-wk3k\","
                    +"\"operator\": \"CREATE_UPDATE_VISITOR\","
                    +"\"info\": { "
                                +"\"workerCode\": \""+req.body.cardnumber+"\","
                                +"\"name\": \""+req.body.name+"\","
                                +"\"gender\": \""+req.body.gender+"\","
                                +"\"facilities\": \""+req.body.facility+"\""
                    +" }"
                    +" }"
    try{
    client.on('connect' ,function(){
        client.publish(topic,message,4000);
        res.status(200).json('publish');
    })
    } catch (err) {
        res.status(400).json(err);
    }     
 };

exports.delete = async (req, res) => { 
    let client = mqtt.connect({
        host: process.env.MQTT_HOST ,
        port: process.env.MQTT_PORT
    })
    const topic = 'LAZADA_WFM'
    const message =  "{"
                    +"\"messageId\": \"1jdi-wk3k\","
                    +"\"operator\": \"CREATE_UPDATE_VISITOR\","
                    +"\"info\": { "
                                +"\"workerCode\": \"\","
                                +"\"name\": \""+req.body.name+"\","
                                +"\"gender\": \"\","
                                +"\"facilities\": \"\","
                    +" }"
                    +" }"
    try{
    client.on('connect' ,function(){
        client.publish(topic,message,4000);
        res.status(200).json('publish');
    })
    } catch (err) {
        res.status(400).json(err);
    }     
 };

 