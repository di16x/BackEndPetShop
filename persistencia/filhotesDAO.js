import conectar from "./conexao.js";
import Filhote from "../modelo/filhotes.js";
export default class filhotesDAO {

    constructor(){
        this.init();
    }

    async init (){
        try {
                const conexao = await conectar();
                const sql = `CREATE TABLE IF NOT EXISTS filhote(
                    id VARCHAR (14) NOT NULL PRIMARY KEY,
                    especie VARCHAR (10) NOT NULL,
                    raca VARCHAR (50) NOT NULL
                  );`;
     
        await conexao.execute(sql);
        await global.poolConexoes.releaseConnection(conexao);
        console.log("Banco de dados iniciado!")
    } catch (erro) {
        console.log("O banco de dados deve mal funcionamento!")
    }
    }

    async gravar (filhote){
        if (filhote instanceof Filhote){
            const conexao = await conectar();
            const sql = `INSERT INTO filhote (id,especie,raca)VALUES (?,?,?);`;
            const parametros = [
                filhote.id,
                filhote.especie,
                filhote.raca
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar (filhote){
        if (filhote instanceof Filhote){
            const conexao = await conectar();
            const sql = `UPDATE filhote SET 
                        raca =?,
                        especie =?
                        WHERE id =?;`;
            const parametros = [
                filhote.raca,
                filhote.especie,
                filhote.id
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);


        }
    }

    async excluir (filhote){
        if(filhote instanceof Filhote){
            const conexao = await conectar();
            const sql = `DELETE FROM filhote WHERE id = ?;`;
            const parametros = [filhote.id];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar (termoBusca){
        let sql = "";
        let parametros = [];
        if (termoBusca){
            sql = `SELECT * FROM filhote WHERE id = ? order by id;`;
            parametros.push(termoBusca);
        }
        else { 
            sql = `SELECT * FROM filhote order by id;`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaFilhotes = [];
        for (const registro of registros){
            const filhote = new Filhote(
                filhote.especie,
                filhote.raca,
                filhote.id
            );
            listaFilhotes.push(filhote);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaFilhotes;

    }

}