const express = require('express');
const app = express();
const gameRoutes = require('./src/routes/game-routes');

app.use(express.json());
app.use('/api/games', gameRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor corrent a http://localhost:' + PORT);
});