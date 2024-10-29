import filhoteDAO from '../persistencia/filhotesDAO.js';

export default class Filhote{
    #id
    #especie
    #raça


    constructor(id,especie,raça){
        this.#id = id;
        this.#especie = especie;
        this.#raça = raça;}


    get id (){
        return this.#id;
    }

    set id (novoid){
       this.#id = novoid; 
    }

    
    get especie (){
        return this.#especie;
    }

    set especie (novaespecie){
       this.#especie = novaespecie; 
    }


    
    get raça (){
        return this.raça;
    }

    set raça (novoraça){
       this.#raça = novoraça; 
    }

    
   
    

    toString(){
        return `Id: ${this.#id} 
Espécie: ${this.#especie} 
Raça do Animal: ${this.#raça} \n`
    }

    toJSON(){
        return {
            id:this.#id,
            especie:this.#especie,
            raça:this.#raça,
           
        }
    }

    async incluir (){
        const filhDAO = new filhoteDAO();
        await filhDAO.gravar(this);
    }

    async alterar (){
        const filhDAO = new filhoteDAO();
        await filhDAO.alterar(this);
    }
    
    async excluir(){
        const filhDAO = new filhoteDAO();
        await filhDAO.excluir(this);
    }

    async consultar(termoBusca){
        const filhDAO = new filhoteDAO();
        return await filhDAO.consultar(termoBusca);
    }
}