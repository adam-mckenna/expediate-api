import Fastify from 'fastify';
import type { FastifyInstance, RouteShorthandOptions } from 'fastify';

const server: FastifyInstance = Fastify({
  logger: true
});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { 
            type: 'object',
            additionalProperties: true 
          }
        }
      }
    }
  }
}

type FoodItem = {
  name: string;
  quantity: number;
}

const handleFoodItems = (foodItems: Array<FoodItem>) => {
  console.log(foodItems)
  return foodItems;
}

server.post('/dqs', opts, async (request, reply) => {
  const data = handleFoodItems(request.body as Array<FoodItem>);
  reply.status(200).send({
    success: true,
    message: 'DQS received',
    data
  });
})

const start = async () => {
  try {
    console.log('Starting server...');
    await server.listen({ port: 3000, host: '0.0.0.0' });
    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

console.log('Initializing server...');
start();