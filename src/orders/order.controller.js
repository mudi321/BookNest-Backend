const Order = require("./order.model");

// Create new order
const createOrder = async (req, res) => {
    try {
        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error("Something went wrong", error);
        res.status(500).json({message: "Failed posting the order", error: error.message});
    }
}


// Fetch orders
const getOrder = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await Order.find({email}).sort({createdAt: -1});
        if (!orders || orders.length === 0) {
            res.status(404).json({message: "Orders N/A"});
        }
        res.status(200).json({orders}); 
    } catch (error) {
        console.error("error in fetching orders by email", error);
        res.status(500).json({message: "Failed to fetch orders by email", error: error.message});
    }
}

module.exports = {
    createOrder,
    getOrder
}



