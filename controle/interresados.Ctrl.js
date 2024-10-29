import Interresado from "../modelo/interresados.js";


export default class InterresadosCtrl{
    
    gravar (requisicao,resposta){
        if(requisicao.method == "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const id = dados.id;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const email = dados.email;
            

            if (nome && sigla && num_registro){
                const interresado = new Interresado(id,cpf, nome, telefone, email);
                interresado.incluir() .then (() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Interresado cadastrado com sucesso!"
                    })
                }).catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem": "Erro ao incluir o interresado:" + erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem":"Requisição invalida! Informe todos os dados"
                })
            }

        }
        else {
            resposta.status(405).json({
                "status":false,
                "mensagem": "Requisição inválida!"
            })
        }
    };

    alterar (requisicao,resposta){
        if((requisicao.method == "PUT" || requisicao.method == "PATCH")
            && requisicao.is("application/json")){
            const dados = requisicao.body;
            const id = dados.id;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const email = dados.email;
            
            if (id && cpf && nome && telefone && email){
                const interresado = new Interresado(id, cpf, nome, telefone, email );
                interresado.alterar().then(()=> {
                    resposta.status(200).json({
                        "status" : true,
                        "mensagem":"Interresado alterado com sucesso!"

                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao alterar o interresado " + erro.message
                })
            })
        }
            else {
                resposta.status(400).json({
                    "status" : false,
                    "mensagem" : "Requisição mal sucedida!"
                })
            }
        }
            else {
                resposta.status(405).json({
                    "status": false,
                    "mensagem":"Requisição inválida!"
                });
                
            }      
        }

        excluir(requisicao, resposta) {
            if (requisicao.method == "DELETE" && requisicao.is("application/json")) {
                const dados = requisicao.body;
                const id = dados.id; 
        
                if (id) {
                    const interresado = new Interresado(id); 
                    interresado.excluir().then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Interresado excluído com sucesso!"
                        });
                    }).catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o interresado: " + erro.message
                        })
                    })
                } 
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "número de registro não fornecido."
                    });
                }
            } else {
                resposta.status(405).json({
                    "status": false,
                    "mensagem": "Método não permitido."
                });
            }
        }
        
    

    consultar(requisicao,resposta) { 
        let termoBusca = requisicao.params.termoBusca;
        if(!termoBusca){
            termoBusca ="";

        }
        if(requisicao.method == "GET"){
            const interresado = new Interresado();
            interresado.consultar(termoBusca).then((interresados) =>{
                return resposta.status(200).json({
                    "status":true,
                    "listaInterresados": interresados
                });
            }).catch((erro) =>{
                return resposta.status(500).json({
                    "status:":false,
                    "mensagem": "Erro ao consultar a lista de interresados cadastrados " + erro.message
                })
            })
        } else {
                resposta.status(405).json({
                "status":false,
                "mensagem": "Requisição invalida! Consulte a documentação!"
            });
        }
    }
}
