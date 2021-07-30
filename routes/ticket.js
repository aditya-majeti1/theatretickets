const TicketCtrl = require('../controllers/ticket');

//Create Ticket
const createTicket = async (req,res) => {
    try {
        const ticket = await TicketCtrl.create(req.body);
        if (ticket) {
            res.send(ticket);
        }
        res.status(400).send("Ticket creation failed!");
    } catch (error) {
        res.status(400).send(error);
    }
}

//Get Tickets
const getTickets = async (req,res) => {
    try {
        const tickets = await TicketCtrl.find({});
        if (tickets) {
            res.send(tickets);
        }
        res.status(404).send("Tickets not found!");
    } catch (error) {
        res.status(400).send(error);
    }
}

//Get Ticket By Id
const getTicketById = async (req,res) => {
    try {
        const ticket = await TicketCtrl.findById(req.params.id);
        if (ticket) {
            res.send(ticket);
        }
        res.status(404).send("Ticket not found!");
    } catch (error) {
        res.status(400).send(error);
    }
}

//Update Ticket By Id
const updateTicketById = async (req,res) => {
    try {
        const ticket = await TicketCtrl.updateOne(req.params.id, req.body);
        if (ticket) {
            res.send(ticket);
        }
        res.status(400).send("Ticket update failed!");
    } catch (error) {
        res.status(400).send(error);
    }
}

//Delete Ticket By Id
const deleteTicketById = async (req,res) => {
    try {
        const ticket = await TicketCtrl.deleteOne(req.params.id);
        if (ticket) {
            res.send(ticket);
        }
        res.status(400).send("Ticket deletion failed!");
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicketById,
    deleteTicketById
};
