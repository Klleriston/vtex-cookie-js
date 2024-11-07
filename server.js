import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const cookie = 'eyJhbGciOiJFUzI1NiIsImtpZCI6ImNkNTk0Mzg2LTAyYzUtNGE2Mi1hMzI4LWI3ZTM3YTg0MjFiOCIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50LmlkIjpbXSwiaWQiOiI0MWQwODQ0YS03ZDJiLTRiNTMtOTUzOC1mY2U2NDU2ZjBhNTAiLCJ2ZXJzaW9uIjo0LCJzdWIiOiJzZXNzaW9uIiwiYWNjb3VudCI6InNlc3Npb24iLCJleHAiOjE3MzE2NzAyMDcsImlhdCI6MTczMDk3OTAwNywianRpIjoiZmVkZDI5NmItMTAyOC00YTFkLTk3NTYtZDUyYjc1NzgyM2Y4IiwiaXNzIjoic2Vzc2lvbi9kYXRhLXNpZ25lciJ9.Reuf3g8iEyMeptPmaoGKzaZyerHCaZkPmNjJ8b2KqrjwkPUqraR6mOVDEgdEsDxfUD_sQW5xb941SjFSmfe1dQ;';

async function fetchSessionData() {
  const response = await fetch('https://www.futuro.digital/api/sessions?items=*', {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `vtex_session=${cookie}`,
    },
  });
  const data = await response.json();
  return data.namespaces.public.stateuf;
}


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

app.listen(3000, () => console.log('Proxy rodando na porta 3000'));