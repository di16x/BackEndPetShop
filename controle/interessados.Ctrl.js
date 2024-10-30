import Interessado from "../modelo/interessados.js";


export default class InteressadosCtrl{
    
    gravar (requisicao,resposta){
        if(requisicao.method == "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const id = dados.id;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const email = dados.email;
            

            if (id && cpf && nome && telefone && email){
                const interessado = new Interessado(id,cpf, nome, telefone, email);
                interessado.incluir() .then (() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Interessado cadastrado com sucesso!"
                    })
                }).catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem": "Erro ao incluir o interessado:" + erro.message
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
                const interessado = new Interessado(id, cpf, nome, telefone, email );
                interessado.alterar().then(()=> {
                    resposta.status(200).json({
                        "status" : true,
                        "mensagem":"Interessado alterado com sucesso!"

                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao alterar o interessado " + erro.message
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
                    const interessado = new Interessado(id); 
                    interessado.excluir().then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Interessado excluído com sucesso!"
                        });
                    }).catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o interessado: " + erro.message
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
            const interessado = new Interessado();
            interessado.consultar(termoBusca).then((interessados) =>{
                return resposta.status(200).json({
                    "status":true,
                    "listaInteressados": interessados
                });
            }).catch((erro) =>{
                return resposta.status(500).json({
                    "status:":false,
                    "mensagem": "Erro ao consultar a lista de interessados cadastrados " + erro.message
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
