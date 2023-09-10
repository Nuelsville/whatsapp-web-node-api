const { Content, Subscriber, Category, Sequelize } = require('../models');
const Op = Sequelize.Op;

const sendNotifications = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find contents added today
        const todayContents = await Content.findAll({
            where: {
                createdAt: {
                    [Op.gte]: today,
                },
            },
            include: Category,
        });

        console.log(todayContents);

        const subscribers = await Subscriber.findAll({
            include: Category,
        });

        const notifications = [];

        for (const subscriber of subscribers) {
            const subscriberCategories = subscriber.Categories.map(category => category.id);
            const relevantContents = todayContents.filter(content =>
                content.Categories.some(category => subscriberCategories.includes(category.id))
            );

            if (relevantContents.length > 0) {
                const subscriberNotification = {
                    subscriberId: subscriber.id,
                    subscriberPhone: subscriber.phone,
                    contents: relevantContents.map(content => ({
                        title: content.title,
                        body: content.body,
                    })),
                };
                notifications.push(subscriberNotification);
            }
        }

        // In a real scenario, you might want to send notifications to subscribers
        // using a messaging service like email or push notifications.
        // Here, we are just sending the notifications as a response.

        res.json(notifications);
    } catch (error) {
        console.error('Error sending notifications:', error);
        res.status(500).json({ message: 'Notification sending failed' });
    }
}

module.exports = { sendNotifications };
