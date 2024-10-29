import conectar from "./conexao.js";
import Interessado from "../modelo/interessados.js";
export default class interessadosDAO {

    constructor(){
        this.init();
    }

    async init (){
        try {
                const conexao = await conectar();
                const sql = `CREATE TABLE IF NOT EXISTS interessado(
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

    async gravar (interessado){
        if (interessado instanceof Interessado){
            const conexao = await conectar();
            const sql = `INSERT INTO interessado (cpf,nome,telefone,email,id)VALUES (?,?,?,?,?);`;
            const parametros = [
                interessado.cpf,
                interessado.nome,
                interessado.telefone,
                interessado.email,
                interessado.id
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar (interessado){
        if (interessado instanceof Interessado){
            const conexao = await conectar();
            const sql = `UPDATE interessado SET
                        cpf=?,
                        nome =?,
                        telefone =?,
                        email =?,
                        WHERE id =?;`;
            const parametros = [
                interessado.cpf,
                interessado.nome,
                interessado.telefone,
                interessado.email,
                interessado.id
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);


        }
    }

    async excluir (interessado){
        if(interessado instanceof Interessado){
            const conexao = await conectar();
            const sql = `DELETE FROM interessado WHERE id = ?;`;
            const parametros = [interessado.id];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar (termoBusca){
        let sql = "";
        let parametros = [];
        if (termoBusca){
            sql = `SELECT * FROM interessado WHERE id = ? order by nome;`;
            parametros.push(termoBusca);
        }
        else { 
            sql = `SELECT * FROM interessado order by nome;`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaInteressados = [];
        for (const registro of registros){
            const interessado= new Interessado(
                interessado.cpf,
                interessado.nome,
                interessado.telefone,
                interessado.email,
                interessado.id
            );
            listaInteressados.push(interessado);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaInteressados;

    }

}