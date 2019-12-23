import * as amqp from 'amqplib/callback_api';

const CONN_URL = process.env.AMQP_CONNECTION_URL;

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    if (!conn) {
        console.error('AMQP Connection has failed. Connection is null or undefined');
        return;
    }
    try {
        conn.createChannel(function (err, channel) {
            ch = channel;
        });
    } catch (err) {
        console.error(err);
    }
});

export const publishToQueue = async (queueName, data) => {
    ch.sendToQueue(queueName, new Buffer(data));
}

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});