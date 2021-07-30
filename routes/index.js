const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicketById,
    deleteTicketById
} = require('./ticket');
const {
    analyticsEarned,
    analyticsVisited
} = require('./analytics');
const {
    ticketCreationValidation,
    ticketUpdateValidation,
    analyticsValidation

} = require('../middleware/validation');

router.use(verifyToken);

//Create Ticket
router.post('/tickets/', ticketCreationValidation, createTicket);

//Get Tickets
router.get('/tickets/', getTickets);

//Get Ticket By Id
router.get('/tickets/:id', getTicketById);

//Update Ticket By Id
router.put('/tickets/:id', ticketUpdateValidation, updateTicketById);

//Delete Ticket By Id
router.delete('/tickets/:id', deleteTicketById);

//Get earned analytics 
router.get('/analytics/earned', analyticsValidation, analyticsEarned);

//Get visited analytics 
router.get('/analytics/visited', analyticsValidation, analyticsVisited);

module.exports = router;