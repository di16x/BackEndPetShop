import express from "express";
import rotaFilhote from "./rotas/rotafilhotes.js";
import rotaInterresado from "./rotas/rotainterresados.js";
import cors from "cors"

const app = express();
const host = '0.0.0.0';
const porta = 4000;

app.use(cors({
    origin:"*"
}));  

app.use(express.json());

app.use('/filhote', rotaFilhote);
app.use('/interresados',rotaInterresado);

app.listen(porta,host, () => {
    console.log(`Servidor iniciado em http://${porta}`);
})