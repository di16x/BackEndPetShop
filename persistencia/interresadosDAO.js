import conectar from "./conexao.js";
import Interresado from "../modelo/interresados.js";
export default class interresadosDAO {

    constructor(){
        this.init();
    }

    async init (){
        try {
                const conexao = await conectar();
                const sql = `CREATE TABLE IF NOT EXISTS interresado(
                    cpf INT NOT NULL,
                    nome VARCHAR (50) NOT NULL,
                    telefone VARCHAR (14) NOT NULL 
                    email VARCHAR (14)
                    id (14) NOT NULL PRIMARY KEY);
                    `;
        await conexao.execute(sql);
        await global.poolConexoes.releaseConnection(conexao);
        console.log("Banco de dados iniciado!")
    } catch (erro) {
        console.log("O banco de dados deve mal funcionamento!")
    }
    }

    async gravar (interresado){
        if (interresado instanceof Interresado){
            const conexao = await conectar();
            const sql = `INSERT INTO interresado (cpf,nome,telefone,email,id)VALUES (?,?,?,?,?);`;
            const parametros = [
                interresado.cpf,
                interresado.nome,
                interresado.telefone,
                interresado.email,
                interresado.id
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar (interresado){
        if (interresado instanceof Interresado){
            const conexao = await conectar();
            const sql = `UPDATE interresado SET
                        cpf=?,
                        nome =?,
                        telefone =?,
                        email =?,
                        WHERE id =?;`;
            const parametros = [
                interresado.cpf,
                interresado.nome,
                interresado.telefone,
                interresado.email,
                interresado.id
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);


        }
    }

    async excluir (interresado){
        if(interresado instanceof Interresado){
            const conexao = await conectar();
            const sql = `DELETE FROM interresado WHERE id = ?;`;
            const parametros = [interresado.id];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar (termoBusca){
        let sql = "";
        let parametros = [];
        if (termoBusca){
            sql = `SELECT * FROM interresado WHERE id = ? order by nome;`;
            parametros.push(termoBusca);
        }
        else { 
            sql = `SELECT * FROM interresado order by nome;`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaInterresados = [];
        for (const registro of registros){
            const interresado= new Interresado(
                interresado.cpf,
                interresado.nome,
                interresado.telefone,
                interresado.email,
                interresado.id
            );
            listaInterresados.push(interresado);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaInterresados;

    }

}