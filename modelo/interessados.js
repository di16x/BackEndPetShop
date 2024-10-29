import interessadoDAO from '../persistencia/interessadosDAO.js';

export default class Interessado{
    #id
    #cpf
    #nome
    #telefone
    #email


    constructor(id,cpf,nome,telefone,email){
        this.#id = id;
        this.#cpf = cpf
        this.#nome = nome;
        this.#telefone = telefone;
        this.#email = email;}


    get id (){
            return this.#id;
        }
    
    set id (novoid){
           this.#id = novoid; 
        }

    get cpf (){
            return this.#cpf;
        }
    set nome (novocpf){
           this.#nome = novocpf; 
        }

    get nome (){
        return this.#nome;
    }

    set nome (novonome){
       this.#nome = novonome; 
    }

    
    get telefone (){
        return this.#telefone;
    }

    set telefone (novotelefone){
       this.#telefone = novotelefone; 
    }


    
    get email (){
        return this.#email;
    }

    set email (novoemail){
       this.#email = novoemail; 
    }

    
   
    

    toString(){
        return `
Id: ${this.#id}
CPF: ${this.#cpf}
Nome: ${this.#nome} 
Telefone: ${this.#telefone} 
Email: ${this.#email} \n`
    }

    toJSON(){
        return {
            id:this.#id,
            cpf:this.#cpf,
            nome:this.#nome,
            telefone:this.#telefone,
            email:this.#email,
           
        }
    }

    async incluir (){
        const inteDAO = new interessadoDAO();
        await inteDAO.gravar(this);
    }

    async alterar (){
        const inteDAO = new interessadoDAO();
        await inteDAO.alterar(this);
    }
    
    async excluir(){
        const inteDAO = new interessadoDAO();
        await inteDAO.excluir(this);
    }

    async consultar(termoBusca){
        const inteDAO = new interessadoDAO();
        return await inteDAO.consultar(termoBusca);
    }
}