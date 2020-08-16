import { UserSchemaExtract } from './../models/user.model';
import { ValidatedRequestSchema, ContainerTypes, createValidator } from 'express-joi-validation';
import Joi from '@hapi/joi';

export const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .required(),
  age: Joi.number().integer().min(4).max(130)
    .required()
});

export const userValidator = createValidator({
  passError: true
}).body(userSchema);

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: UserSchemaExtract
}
