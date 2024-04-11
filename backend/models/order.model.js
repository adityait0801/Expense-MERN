const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    paymentId:{type: String, required: false},
    orderId:{type: String, required: true},
    status:{type: String, default: "pending"}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
