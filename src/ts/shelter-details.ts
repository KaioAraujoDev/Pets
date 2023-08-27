//interfaces
interface socials{
    instagram:"",
    email:"",
    telefone:""
}
interface animals{
    [chave:string]:string;
}
interface shelterInfos {
     animais:animals;
     contato:socials;
     estado:string;
     estado_extenso:string;
     descricao:string;
     img:string;
     nome:string;
     local:string;
}

class shelter{
    image:string = '';
    animals:Array<string> = [''];
    contacts:socials = {instagram:"",email:"",telefone:""};
    estado:string = '';
    estadoExtenso:string = '';
    descricao:string = '';
    nome:string = '';
    local:string = '';

    constructor(image:string,
                animals:Array<string>,
                contacts:socials,
                estado:string,
                estadoExtenso:string,
                descricao:string,
                nome:string,
                local:string,
                ){

        this.showShelter(image,
                         animals,
                         contacts,
                         estado,
                         estadoExtenso,
                         descricao,
                         nome,
                         local);
    }
    
    showShelter(image:string,
                animals:Array<string>,
                contacts:socials,
                estado:string,
                estadoExtenso:string,
                descricao:string,
                nome:string,
                local:string):void{
        
        //Selecionando div de Resultado
        const resultInfosShelter:HTMLDivElement = document.querySelector('#result-infos-shelter') ?? new HTMLDivElement;

        //Criando Elementos de exibição do conteúdo do abrigo

        //Image
        const divImg:HTMLDivElement = document.createElement('div');
        divImg.classList.add('div-img');
        const img:HTMLImageElement = document.createElement('img');
        img.src = image;
        
        divImg.appendChild(img);
        resultInfosShelter.appendChild(divImg);

        //Nome Abrigo
    
        const nomeShelter = document.createElement('h2');
        nomeShelter.textContent = nome;
        resultInfosShelter.appendChild(nomeShelter);

        //Localização 

        const localShelter = document.createElement('h3');
        localShelter.textContent = local;
        resultInfosShelter.appendChild(localShelter);

        //Descrição 

        const descricaoText = document.createElement('p');
        descricaoText.textContent = descricao;
        resultInfosShelter.appendChild(descricaoText);

        //Contatos
        
        const divContacts = document.createElement('div');
        divContacts.classList.add('div-contacts');

        const showContacts = (contact:string,type:string): void =>{

            const divContact = document.createElement('div');
            const img = document.createElement('img');
            const info = document.createElement('p');

            divContact.classList.add(`div-contact`);
            divContact.dataset.type = type;
            img.src = `/public/imgs/${type}.svg`;
            info.textContent = contact;

            divContact.appendChild(img);
            divContact.appendChild(info);
            
            divContacts.appendChild(divContact);
        }   

        showContacts(contacts.telefone,'telefone');
        showContacts(contacts.email,'Email');
        showContacts(contacts.instagram,'instagram');
      
        resultInfosShelter.appendChild(divContacts);
    }
}



window.addEventListener('DOMContentLoaded',()=>{
    //Busca dados e converte em JSON
    const dataShelterSave:string = localStorage.getItem('shelter') ?? '';
    const JSONDataShelter:shelterInfos = JSON.parse(dataShelterSave);

    //Busca propriedades animais
    const animalsKeys = Object.keys(JSONDataShelter.animais);

    //Acessa valores das propriedades de animais e cria um novo array com os valores
    const animalsArray = animalsKeys.map(key => JSONDataShelter.animais[key]);

    const shelterPage = new shelter(
        JSONDataShelter.img,
        animalsArray,
        JSONDataShelter.contato,
        JSONDataShelter.estado,
        JSONDataShelter.estado_extenso,
        JSONDataShelter.descricao,
        JSONDataShelter.nome,
        JSONDataShelter.local
    );

})