const { Subscriber, Category } = require('../models');

const addSubscriber = async (req, res) => {
    try {
        const { phone, app, categoryIds } = req.body;

        // Create the subscriber
        const subscriber = await Subscriber.create({
            phone,
            app,
        });

        // Find the selected categories
        const selectedCategories = await Category.findAll({
            where: {
                id: categoryIds,
            },
        });

        // Add the selected categories to the subscriber
        await subscriber.addCategories(selectedCategories);

        res.status(201).json({ message: 'Subscriber added successfully', subscriber });
    } catch (error) {
        console.error('Error adding subscriber:', error);
        res.status(500).json({ message: 'Subscriber addition failed' });
    }
};

const editSubscriber = async (req, res) => {
    try {
        const { id } = req.params;
        const { phone, app, categoryIds } = req.body;

        // Find the subscriber by ID
        const subscriber = await Subscriber.findByPk(id);

        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }

        // Update subscriber data
        await subscriber.update({
            phone,
            app,
        });

        // Find the selected categories
        const selectedCategories = await Category.findAll({
            where: {
                id: categoryIds,
            },
        });

        // Set the selected categories for the subscriber
        await subscriber.setCategories(selectedCategories);

        res.json({ message: 'Subscriber updated successfully', subscriber });
    } catch (error) {
        console.error('Error editing subscriber:', error);
        res.status(500).json({ message: 'Subscriber update failed' });
    }
};

const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.findAll({
            include: Category,
        });

        res.json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ message: 'Error fetching subscribers' });
    }
};

module.exports = { addSubscriber, editSubscriber, getAllSubscribers };
