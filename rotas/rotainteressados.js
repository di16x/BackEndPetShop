import { Router} from "express";
import InteressadosCtrl from "../controle/interessados.Ctrl.js";

const rotaInteressado= Router();
const ctrlInteressados = new InteressadosCtrl();

rotaInteressado.get("/", ctrlInteressados.consultar)

.get("/:termoBusca",ctrlInteressados.consultar)
.post("/",ctrlInteressados.gravar)
.put("/",ctrlInteressados.alterar)
.patch("/",ctrlInteressados.alterar)
.delete("/",ctrlInteressados.excluir);

export default rotaInteressado;