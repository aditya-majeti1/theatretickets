const TicketCtrl = require('../controllers/ticket');

const R = require('ramda');
const moment = require('moment');

const earned = async (data) => {
    try {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let result = [];
        if (data.method === 'aggregation') {
            const query = [{
                $match: {
                    creationDate: {
                        $gte: new Date(data.fromDate),
                        $lte: new Date(data.toDate)
                    }
                }
            }, {
                $group: {
                    _id: {
                        $substr: ['$creationDate', 5, 2]
                    },
                    summaryProfit: {
                        $sum: "$ticketPrice"
                    }
                }
            }];
            result = await TicketCtrl.aggregate(query);
            result.forEach((obj) => {
                obj.month = months[parseInt(obj._id) - 1];
                delete obj._id;
            });
        }

        if (data.method === 'algorithms') {
            const query = {
                creationDate: {
                    $gte: new Date(data.fromDate),
                    $lte: new Date(data.toDate)
                }
            };
            const tickets = await TicketCtrl.find(query);
            
            tickets.forEach((ticket) => {
                let month = moment(ticket.creationDate).format('MMMM');
                let index = R.findIndex(R.propEq('month', month))(result);
                if (index !== -1) {
                    result[index].summaryProfit += ticket.ticketPrice;
                } else {
                    result.push({
                        month,
                        summaryProfit: ticket.ticketPrice
                    });
                }
            });
        }
        return result;
    } catch (error) {
        return error;
    }
}

const visited = async (data) => {
    try {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let result = [];
        if (data.method === 'aggregation') {
            const query = [{
                $match: {
                    creationDate: {
                        $gte: new Date(data.fromDate),
                        $lte: new Date(data.toDate)
                    }
                }
            }, {
                $group: {
                    _id: {
                        $substr: ['$creationDate', 5, 2]
                    },
                    summaryVisits: {
                        $sum: 1
                    }
                }
            }];
            result = await TicketCtrl.aggregate(query);
            result.forEach((obj) => {
                obj.month = months[parseInt(obj._id) - 1];
                delete obj._id;
            });
        }

        if (data.method === 'algorithms') {
            const query = {
                creationDate: {
                    $gte: new Date(data.fromDate),
                    $lte: new Date(data.toDate)
                }
            };
            const tickets = await TicketCtrl.find(query);

            tickets.forEach((ticket) => {
                let month = moment(ticket.creationDate).format('MMMM');
                let index = R.findIndex(R.propEq('month', month))(result);
                if (index !== -1) {
                    result[index].summaryVisits += 1;
                } else {
                    result.push({
                        month,
                        summaryVisits: 1
                    });
                }
            });
        }
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = {
    earned,
    visited
};
