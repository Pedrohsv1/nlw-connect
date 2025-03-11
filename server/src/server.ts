import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'
import { env } from './env'
import { SubscribeToEventRoute } from './routes/subscribe-to-event.route'

import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { accessInviteLinkRoute } from './routes/access-invite-link.route'
import { getRankingRoute } from './routes/get-ranking.route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks.route'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count.route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position.route'

// Initialize Fastify
const app = fastify().withTypeProvider<ZodTypeProvider>()

// Set Serializer and Validator
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// Register
app.register(fastifyCors, {
  origin: true,
})
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      description: 'API Documentation',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})
// Define theme for Swagger UI
const theme = new SwaggerTheme()
const content = theme.getBuffer(SwaggerThemeNameEnum.DARK)
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  theme: {
    css: [{ filename: 'theme.css', content: content }],
  },
})

// Register Routes
app.register(SubscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

// Listen
app.listen({ port: env.PORT }).then(() => {
  console.log(`--- Server is running at ${env.PORT} --->`)
})
