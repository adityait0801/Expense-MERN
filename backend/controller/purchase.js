const Order = require('../models/order.model');
const Razorpay = require('razorpay');
require('dotenv').config();

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

const premiummembership = async (req, res) => {
    try {
        const rzpInstance = new Razorpay({
            key_id: key_id,
            key_secret: key_secret
        });
        var options = {
            amount: 50000,
            currency: "INR",
        };
        const orderDetails = await rzpInstance.orders.create(options);
        const user = req.user;

        const order = new Order({
            orderId: orderDetails.id,
            status: orderDetails.status
        });

        await order.save();

        res.status(200).send({ key_id: key_id, orderId: orderDetails.id, user: user });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error creating premium membership" });
    }
};

const updateTransactionStatus = async (req, res) => {
    const { orderId, paymentId } = req.body;

    try {
        const user = req.user;
        user.isPremiumUser = true;

        await Promise.all([
            user.save(),
            Order.updateOne(
                { orderId: orderId },
                { $set: { paymentId: paymentId, status: "Successful" }}
            )
        ]);

        res.status(202).send({ success: true, message: "Thank you for being a premium user" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error updating transaction" });
    }
};

module.exports = {
    premiummembership,
    updateTransactionStatus
};
