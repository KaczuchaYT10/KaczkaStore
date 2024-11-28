const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`Adres IP użytkownika: ${userIP}`);
    res.send('Cześć, Twój IP to: ' + userIP);
});

app.listen(3000, () => console.log('Serwer działa na porcie 3000'));
