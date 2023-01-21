import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  PGDATABASE: Joi.string().required(),
  PGHOST: Joi.string().required(),
  PGPASSWORD: Joi.string().required(),
  PGPORT:Joi.number().default(6679).required(),
  PGUSER:Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  DB_ENTITIES: Joi.string()
});
