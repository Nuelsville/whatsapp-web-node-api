const { Content, Category } = require('../models');

const addContent = async (req, res) => {
    try {
        const { title, body, categoryIds } = req.body;

        // Create the content
        const content = await Content.create({
            title,
            body,
        });

        // Find the selected categories
        const selectedCategories = await Category.findAll({
            where: {
                id: categoryIds,
            },
        });

        // Add the selected categories to the content
        await content.addCategories(selectedCategories);

        res.status(201).json({ message: 'Content added successfully', content });
    } catch (error) {
        console.error('Error adding content:', error);
        res.status(500).json({ message: 'Content addition failed' });
    }
};

const editContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body, categoryIds } = req.body;

        // Find the content by ID
        const content = await Content.findByPk(id);

        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        // Update content data
        await content.update({
            title,
            body,
        });

        // Find the selected categories
        const selectedCategories = await Category.findAll({
            where: {
                id: categoryIds,
            },
        });

        // Set the selected categories for the content
        await content.setCategories(selectedCategories);

        res.json({ message: 'Content updated successfully', content });
    } catch (error) {
        console.error('Error editing content:', error);
        res.status(500).json({ message: 'Content update failed' });
    }
};

const getAllContent = async (req, res) => {
    try {
        const contents = await Content.findAll({
            include: Category,
        });

        res.json(contents);
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({ message: 'Error fetching content' });
    }
};

const deleteContent = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the content by ID
        const content = await Content.findByPk(id);

        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        // Delete the content
        await content.destroy();

        res.json({ message: 'Content deleted successfully' });
    } catch (error) {
        console.error('Error deleting content:', error);
        res.status(500).json({ message: 'Content deletion failed' });
    }
};

module.exports = {
    addContent, 
    editContent, 
    getAllContent, 
    deleteContent
};
