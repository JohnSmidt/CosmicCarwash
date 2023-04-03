//import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

app.use(express.static(__dirname + '/src'))
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(8080, () =>
    console.log(`Cosmic Carwash listening on port 8080!`),
);
