const Ticket = require('../models/Ticket');

//Create Ticket
const create = (data) => {
    try {
        const ticket = Ticket.create(data);
        return ticket
    } catch (err) {
        return err
    }
}

//Get Tickets
const find = (query) => {
    try {
        const tickets = Ticket.find(query);
        return tickets;
    } catch (error) {console.log(error)
        res.status(400).send(error);
    }
}

//Get Ticket By Id
const findById = (id) => {
    try {
        const ticket = Ticket.findById(id);
        return ticket;
    } catch (error) {
        res.status(400).send(error);
    }
}

//Update Ticket By Id
const updateOne = (id, data) => {
    try {
        const ticket = Ticket.updateOne(
            { _id: id },
            { $set: data },
            { upsert: true }
        );
        return ticket;        
    } catch (error) {
        res.status(400).send(error);
    }
}

//Delete Ticket By Id
const deleteOne = (id) => {
    try {
        const ticket = Ticket.deleteOne({ _id: id });
        return ticket;
    } catch (error) {
        res.status(400).send(error);
    }
}

//Aggregate on Tickets
const aggregate = (query) => {
    try {
        const ticket = Ticket.aggregate(query);
        return ticket;
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    create,
    find,
    findById,
    updateOne,
    deleteOne,
    aggregate
};
