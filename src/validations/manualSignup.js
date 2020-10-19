import joi from 'joi';

const userValidator = (body) => {
  const userSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6)
      .max(32),
    passwordConfirm: joi.string().valid(joi.ref('password')).required().error(new Error('Password not match')),
    name: joi.string().required().min(4).max(16),

  });
  return userSchema.validate(body);
};

export default userValidator;
