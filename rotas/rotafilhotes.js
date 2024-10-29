import { Router} from "express";
import FilhoteCtrl from "../controle/filhotes.Ctrl.js";

const rotaFilhote= Router();
const ctrlFilhote = new FilhoteCtrl();

rotaFilhote.get("/", ctrlFilhote.consultar)

.get("/:termoBusca",ctrlFilhote.consultar)
.post("/",ctrlFilhote.gravar)
.put("/",ctrlFilhote.alterar)
.patch("/",ctrlFilhote.alterar)
.delete("/",ctrlFilhote.excluir);

export default rotaFilhote;