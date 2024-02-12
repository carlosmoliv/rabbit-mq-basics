import amqp, { Channel } from "amqplib";
import config from "./config";

// Step 1: Connect to the rabbitmq server
// Step 2: create a new channel on that connection
// Step 3: Create the exchange
// Step 4: Publish the message to the exchange with routing key
export class Producer {
  channel!: Channel;

  async createChannel() {
    const connection = await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey: string, message: string): Promise<void> {
    if (!this.channel) await this.createChannel();
    const exchangeName = config.rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, "direct");
    const logDetails = {
      logType: routingKey,
      message: message,
      dateTime: new Date(),
    };
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    );
    console.log(`The message ${message} was sent to exchange ${exchangeName}`);
  }
}
