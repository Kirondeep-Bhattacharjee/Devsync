const cors = require('cors');
const express = require('express');
const { ZegoExpressEngine } = require('zego-express-server-sdk');

const app = express();
app.use(cors());
const port = 3001; // Or any port you prefer

// Initialize Zego Express Engine
const appID = 1865806996; // Replace with your Zego AppID
const serverSecret = 'ca43965764ea8aee4cff92853dd30018'; // Replace with your Zego ServerSecret
const zego = new ZegoExpressEngine(appID, serverSecret);

app.get('/api/get-zego-token', (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    try {
        const token = zego.generateToken(userId, 3600, ''); // Token valid for 1 hour
        res.json({ token });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ error: 'Failed to generate token' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
