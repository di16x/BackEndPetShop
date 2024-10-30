import filhoteDAO from '../persistencia/filhotesDAO.js';

export default class Filhote{
    #id
    #especie
    #raca


    constructor(id,especie,raca){
        this.#id = id;
        this.#especie = especie;
        this.#raca = raca;}


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


    
    get raca (){
        return this.raca;
    }

    set raca (novoraca){
       this.#raca = novoraca; 
    }

    
   
    

    toString(){
        return `Id: ${this.#id} 
Espécie: ${this.#especie} 
Raça do Animal: ${this.#raca} \n`
    }

    toJSON(){
        return {
            id:this.#id,
            especie:this.#especie,
            raca:this.#raca,
           
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