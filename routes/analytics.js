const analyticsCtrl = require('../controllers/analytics');

const analyticsEarned = async (req, res) => {
    try {
        const earnedResult = await analyticsCtrl.earned(req.query);
        res.send(earnedResult);
    } catch (error) {
        res.status(400).send(error);
    }
}

const analyticsVisited = async (req, res) => {
    try {
        const earnedResult = await analyticsCtrl.visited(req.query);
        res.send(earnedResult);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    analyticsEarned,
    analyticsVisited
};