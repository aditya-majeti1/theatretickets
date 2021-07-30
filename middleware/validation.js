const Joi = require('@hapi/joi');

const ticketCreationValidation = (req, res, next) => {
    try {
        if (!Object.keys(req.body).length) return res.status(422).send("Input required");

        let schema = '';
        const ticketCreationObject = {
            customerName: Joi.string().trim().min(3).max(60).required(),
            performanceTitle: Joi.string().trim().min(3).max(60).required(),
            performanceTime: Joi.string().required(),
            ticketPrice: Joi.number().required(),
            creationDate: Joi.date().required()
        };

        if (Array.isArray(req.body)) {
            schema = Joi.array().items(ticketCreationObject);
        } else {
            schema = Joi.object(ticketCreationObject);
        }
        const { error } = schema.validate(req.body);
        if (error) return res.status(422).send(error.details[0].message);

        next();
    } catch (error) {
        throw error;
    }
}

const ticketUpdateValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            _id: Joi.string().required(),
            customerName: Joi.string().trim().min(3).max(60).required(),
            performanceTitle: Joi.string().trim().min(3).max(60).required(),
            performanceTime: Joi.string().required(),
            ticketPrice: Joi.number().required(),
            creationDate: Joi.date().required()
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(422).send(error.details[0].message);
         
        next();
    } catch (error) {
        throw error;
    }
}

const analyticsValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            method: Joi.string().required(),
            fromDate: Joi.string().required(),
            toDate: Joi.string().required()
        });
        const { error } = schema.validate(req.query);
        if (error) return res.status(422).send(error.details[0].message);
         
        next();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    ticketCreationValidation,
    ticketUpdateValidation,
    analyticsValidation
}