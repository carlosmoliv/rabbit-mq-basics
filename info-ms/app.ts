import amqp, { ConsumeMessage } from "amqplib";

// Step 1: Connect to the rabbitmq server
// Step 2: Create a new channel
// Step 3: Create the exchange
// Step 4: Create the queue
// Step 5: Bind the queue to the exchange
// Step 6: Consume messages from the queue

const consumeMessages = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange("logExchange", "direct");
  const queueInfo = await channel.assertQueue("InfoQueue");
  await channel.bindQueue(queueInfo.queue, "logExchange", "Info");
  channel.consume(queueInfo.queue, (message) => {
    if (!message) return;
    const data = JSON.parse(message.content.toString());
    console.log(data);
    channel.ack(message);
  });
};
consumeMessages();
