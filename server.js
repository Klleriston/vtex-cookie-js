import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const cookie = 'eyJhbGciOiJFUzI1NiIsImtpZCI6Ijc0Zjk1YzZhLTY3NmYtNGNmMi05MmI3LWJhOGM5NThlYmJiNSIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50LmlkIjpbXSwiaWQiOiJhZWJjYjI0MC00NTk4LTQ3YWUtYTViNC04YmNkZTNmOWEzZjEiLCJ2ZXJzaW9uIjo5LCJzdWIiOiJzZXNzaW9uIiwiYWNjb3VudCI6InNlc3Npb24iLCJleHAiOjE3MzE3NjMxMTgsImlhdCI6MTczMTA3MTkxOCwianRpIjoiNTEzODQyYTYtNjFlMS00ZTZmLTkxMmItZjQ3NTkxNTYwYzBjIiwiaXNzIjoic2Vzc2lvbi9kYXRhLXNpZ25lciJ9.ld4BKSMT0eDscNCCrpDcNGiFB3ClKoBRLyLk5vSU_bcA2Hni4IXGVwDKiOMoPCzyb_i5vHMr5iOW_RQy_67Ksw';
async function fetchSessionData() {
  const response = await fetch('https://www.futuro.digital/api/sessions?items=*', {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `vtex_session=${cookie}`,
    },
  });
  const data = await response.json();
  return data;
}

async function fetchBotTalk(userMessage) {
  const res = await fetch('https://api.futuro-digital.dev.senai.br/chatbot/', { 
    method: 'POST',
    headers: {
      Authorization: 'Bearer foobar',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "messages": [
        {
          "role": "user",
          "content": userMessage
        }
      ]
    })
  });
  const data = await res.json();
  return data; 
}

app.post('/api/bot-talk', async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { message } = req.body;
    const botResponse = await fetchBotTalk(message); 
    console.log(botResponse);
    res.json({ botResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao conectar com a API');
  }
});


app.get('/api/sessions', async (req, res) => {
  try {

    res.setHeader('Access-Control-Allow-Origin', '*');
    const data = await fetchSessionData();
    res.json(data);
  } catch (error) {
    res.status(500).send('Erro ao conectar com a API');
  }
});

app.post('/api/sessions-data', async (req, res) => {
  try {

    res.setHeader('Access-Control-Allow-Origin', '*');
    const data = await fetchSessionData();
    res.json(data);
  } catch (error) {
    res.status(500).send('Erro ao conectar com a API');
  }
});

app.listen(3000, () => console.log('rodando na porta 3000'));