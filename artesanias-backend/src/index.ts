import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes'
const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(cors()); // Agrega esta línea antes de tus rutas
app.use(express.json());


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use('/api' ,routes)

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
