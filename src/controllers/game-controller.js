const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/games.json');

const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

exports.getAll = (req, res) => {
    res.status(200).json(readData());
};

exports.getById = (req, res) => {
    const id = parseInt(req.params.id);
    const game = readData().find(g => g.id === id);
    game ? res.status(200).json(game) : res.status(404).json({ message: "No trobat" });
};

exports.search = (req, res) => {
    const titleQuery = req.query.title?.toLowerCase();
    if (!titleQuery) return res.status(400).json({ message: "Falta el títol" });
    const filtered = readData().filter(g => g.title.toLowerCase().includes(titleQuery));
    res.status(200).json(filtered);
};

exports.calculate = (req, res) => {
    const games = req.body;
    if (!Array.isArray(games)) return res.status(400).json({ message: "Format incorrecte" });

    const result = games.map(g => {
        const avg = g.scores.reduce((a, b) => a + b, 0) / g.scores.length;
        return {
            videogame: `${g.title} (${g.developer})`,
            finalScore: Math.round(avg)
        };
    });

    result.sort((a, b) => a.videogame.localeCompare(b.videogame));
    res.status(200).json(result);
};