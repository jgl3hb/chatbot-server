require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const apiUrl = 'https://api.openai.com/v1/chat/completions';


app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(apiUrl, {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const botReply = response.data.choices[0].message.content;
    res.send({ reply: botReply });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred' });
  }
});
