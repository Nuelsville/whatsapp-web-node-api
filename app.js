const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const subscriberRoutes = require('./routes/subscriberRoutes')
const contentRoutes = require('./routes/contentRoutes')
const notificationRoutes = require('./routes/notificationRoutes')

// Load environment variables
dotenv.config()

const app = express();

app.use(express.json())
// Use morgan for logging HTTP requests
app.use(morgan('dev'))

const client = new Client();

// Handle QR code generation
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Handle ready event
client.on('ready', () => {
    console.log('Client is ready');
});

// Handle incoming messages
client.on('message', (message) => {
    console.log('Received message:', message.body);
});

// Initialize the WhatsApp Web client
client.initialize();

// Create an Express route to send a message
app.post('/send-message', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const message = req.body.message;
    console.log(phoneNumber)
    client.sendMessage(phoneNumber, message)
        .then((response) => {
            console.log('Message sent successfully:', response);
            res.json({ success: true, message: 'Message sent successfully' });
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            res.status(500).json({ success: false, error: 'Message sending failed' });
        });
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'))

// Enable CORS with whitelist options
// app.use(cors(corsOptions))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api', categoryRoutes)
app.use('/api', subscriberRoutes)
app.use('/api', contentRoutes)
app.use('/api', notificationRoutes)


module.exports = app