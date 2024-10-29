import Filhote from "../modelo/filhotes.js";


export default class FilhoteCtrl{
    
    gravar (requisicao,resposta){
        if(requisicao.method == "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const id = dados.id;
            const especie = dados.especie;
            const raça = dados.raça;
            

            if (id && especie && raça){
                const filhote = new Filhote(id,especie,raça);
                filhote.incluir() .then (() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Filhote cadastrado com sucesso!"
                    })
                }).catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem": "Erro ao incluir o filhote:" + erro.message
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
            const especie = dados.especie;
            const raça = dados.raça;
            
            if (id && especie && raça){
                const filhote = new Filhote(id,especie,raça);
                filhote.alterar().then(()=> {
                    resposta.status(200).json({
                        "status" : true,
                        "mensagem":"Filhote alterado com sucesso!"

                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao alterar o filhote " + erro.message
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
                    const filhote = new Filhote(id); 
                    filhote.excluir().then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Filhote apagado com sucesso!"
                        });
                    }).catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o filhote: " + erro.message
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
            const filhote = new Filhote();
           filhote.consultar(termoBusca).then((filhotes) =>{
                return resposta.status(200).json({
                    "status":true,
                    "listaFilhotes": filhotes
                });
            }).catch((erro) =>{
                return resposta.status(500).json({
                    "status:":false,
                    "mensagem": "Erro ao consultar a lista de filhotes cadastrados " + erro.message
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
