const Joi = require('@hapi/joi');


const registerValidation = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});



    const loginValidation = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    
   module.exports = {
       registerValidation, loginValidation
   } 

