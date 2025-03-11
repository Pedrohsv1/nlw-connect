import {
  accessInviteLinkRoute
} from "./chunk-YFPAPKQF.mjs";
import {
  getRankingRoute
} from "./chunk-4XQWKT3S.mjs";
import {
  getSubscriberInviteClicksRoute
} from "./chunk-FQJ36K5F.mjs";
import {
  getSubscriberInvitesCountRoute
} from "./chunk-UWBQD4F4.mjs";
import {
  getSubscriberRankingPositionRoute
} from "./chunk-J56M4ONJ.mjs";
import "./chunk-IHJHN5JD.mjs";
import {
  SubscribeToEventRoute
} from "./chunk-LOSW7C7C.mjs";
import "./chunk-ZS7UYH6L.mjs";
import "./chunk-PHMFNREO.mjs";
import "./chunk-SXFWF7YV.mjs";
import "./chunk-PNV6U232.mjs";
import "./chunk-5OAAD53O.mjs";
import "./chunk-FTFGPLLB.mjs";
import "./chunk-5G3UUU6T.mjs";
import "./chunk-J4J5D7M7.mjs";
import {
  env
} from "./chunk-AUOFUMQ6.mjs";

// src/server.ts
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
var app = fastify().withTypeProvider();
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.register(fastifyCors, {
  origin: true
});
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "NLW Connect",
      description: "API Documentation",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
var theme = new SwaggerTheme();
var content = theme.getBuffer(SwaggerThemeNameEnum.DARK);
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  theme: {
    css: [{ filename: "theme.css", content }]
  }
});
app.register(SubscribeToEventRoute);
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);
app.listen({ port: env.PORT }).then(() => {
  console.log(`--- Server is running at ${env.PORT} --->`);
});
