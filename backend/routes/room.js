// roomRoutes.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room'); // Make sure this model exists

// Route to get room by projectId
router.post('/getRoom', async (req, res) => {
  try {
    const { projectId } = req.body; // Extract projectId from the request body
    const room = await Room.findOne({ projectId }); // Look for room by projectId
    
    if (room) {
      res.json({ success: true, room });
    } else {
      res.status(404).json({ success: false, message: 'Room not found' });
    }
  } catch (err) {
    console.error('Error fetching room:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
