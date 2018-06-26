const Message = require('../models/message');
const db = require('../config/db');

module.exports = (router) => {

    router.post('/postComment', (req, res) => {
        if (!req.body.comment) {
            res.json({ success: false, message: 'message not found' });
        } else {
            let message = new Message({
                message: req.body.comment
            });

            message.save((err) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    res.json({ success: true, message: 'message saved' });
                }
            });
        }
    });

    return router;
};



