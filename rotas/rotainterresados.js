import { Router} from "express";
import InterresadosCtrl from "../controle/interresados.Ctrl.js";

const rotaInterresado= Router();
const ctrlInterresados = new InterresadosCtrl();

rotaInterresado.get("/", ctrlInterresados.consultar)

.get("/:termoBusca",ctrlInterresados.consultar)
.post("/",ctrlInterresados.gravar)
.put("/",ctrlInterresados.alterar)
.patch("/",ctrlInterresados.alterar)
.delete("/",ctrlInterresados.excluir);

export default rotaInterresado;