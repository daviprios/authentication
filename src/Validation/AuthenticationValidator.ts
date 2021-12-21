import { celebrate, Joi, Segments } from 'celebrate'

const authenticationValidator = {
  signup: celebrate({
    [Segments.BODY]: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required()
    })
  }),

  login: celebrate({
    [Segments.BODY]: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  })
}

export default authenticationValidator