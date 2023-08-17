export class CitySearch{
    private inputCity: HTMLInputElement;
    private valorDigitado: string; 
    private estadoSelecionado: string;
    private dataCities: any;
    private divCidades: any;
    private citiesFinded: string[];
    private formSearchCity: Element;

    constructor(){
        this.inputCity = document.querySelector('#input-cidade') as HTMLInputElement;
        this.formSearchCity = document.querySelector('#form-search-city') as Element;
        this.divCidades = document.querySelector("#div-cidades") as Element;
        this.valorDigitado = '';
        this.estadoSelecionado = '';
        this.dataCities = [{}];
        this.citiesFinded = [''];

        this.getDataCities().then((res)=>{

            this.dataCities = res;

            this.addEvents();
            
        }).catch(e =>{
            alert(e);
        })

    }
    
    private addEvents(){

        this.inputCity.addEventListener("keyup", (event)=>{
            this.valorDigitado = (event.target as HTMLInputElement).value;
            this.findCity(this.valorDigitado, this.estadoSelecionado);
        })

        const divSelect = document.querySelector(".div-select") as HTMLDivElement;
        
        divSelect.addEventListener("click", ()=>{
            const listItens = document.querySelector("#ul-list-states") as Element;
            
            listItens.getAttribute('data-active') === 'false' ? 
                listItens.setAttribute('data-active', 'true') : 
                listItens.setAttribute('data-active', 'false');
        })

        const items = document.querySelectorAll('#ul-list-states li');

        items.forEach(element => {
            element.addEventListener('click', (event) =>{

                const element = event.target as HTMLLIElement; 
                const value = element.getAttribute('value') as string;

                const outputItem = document.querySelector('#output-selected-item') as HTMLParagraphElement;
                
                outputItem.textContent = value;
                this.estadoSelecionado = value;
                 
                this.findCity(this.valorDigitado, this.estadoSelecionado);
            })  
        })

        this.formSearchCity.addEventListener('submit',(event)=>{
            event.preventDefault();
            this.findInfosShelter();
        })
    }
    private async getDataCities(){
        const data = await (await fetch('../data/cities.json')).json();

        return data;
    }

    private async findCity(valorDigitado:string, estadoSelecionado:string){
        
        const citiesName = Object.keys(this.dataCities.cidades);

        this.citiesFinded = citiesName.filter(item=>{
            
            //Mostrar a cidades com base o estado selecionado caso tenham selecionado e valor digitado
            if(estadoSelecionado !== "" && item.toLowerCase().includes(valorDigitado.toLowerCase()) && valorDigitado !== ""){
                return this.filterCityInStateNCity(item);
            
            //Mostrar a cidade com base somente no texto
            }else if(item.toLowerCase().includes(valorDigitado.toLowerCase()) && valorDigitado !== ""){
                this.divCidades.style = "display:block";
                return true;
                
            }else{
                this.divCidades.style = "display:none";
                return false;
                
            }
            
        });

        this.showCity();
    }   

    private filterCityInStateNCity(city:string){    
         //Verificar estado selecionado
         for (let abrigo in this.dataCities.cidades[city]){
            
             if(this.dataCities.cidades[city][abrigo].estado === this.estadoSelecionado){
                this.divCidades.style = "display:block";
                return true;
                 
             }else{
                 return false;
             }
                    
         }
    }

    private showCity(){
        this.divCidades.innerHTML = '';
         
        this.citiesFinded.forEach(citie =>{
            const divCitieFinder = document.createElement('div');
            divCitieFinder.textContent = citie;

            divCitieFinder.addEventListener('click',(event)=>{
                this.inputCity.value = (event.target as HTMLInputElement).textContent ?? "";
            
            })

            this.divCidades.appendChild(divCitieFinder);
                
        })  
    }
    
    private findInfosShelter(){
        const citiesName = Object.keys(this.dataCities.cidades).sort();
        
        const citieFinder = citiesName.find(citie=>{
            return this.inputCity.value.toLowerCase() === citie.toLowerCase()
        }) as string

       const shelters = this.dataCities.cidades[citieFinder];

       this.showInfosSheltersFinded(shelters , citieFinder)

    }
    private showInfosSheltersFinded(shelters:any, city:string){
        const sectionResult = document.querySelector('#result') as Element;
        sectionResult.innerHTML = '';
        const listAnimals = document.createElement('ul');
        listAnimals.classList.add('animals')
        
        function searchAnimals(shelter:any){
            let animals = [];
            listAnimals.innerHTML = '';
            for(let number in shelter.animais){
                animals.push(shelter.animais[number]);
            }
            
            animals.forEach(animal =>{
                const itemAnimal = document.createElement('li');
                itemAnimal.textContent = animal;
                
                listAnimals.appendChild(itemAnimal);
                
            })

            return listAnimals.outerHTML;
           
        }

        function searchSocialNetwork(shelter:any){
            const divSocial = document.createElement('ul');
            divSocial.classList.add('social')

           
            function handleNetwork(network:any, type:string){
                const itemSocial = document.createElement('li');
                const linkSocial = document.createElement('a');
                const imgSocial = document.createElement('img');


                if(type === "instagram" && network !== undefined){
                    linkSocial.href = `https://www.instagram.com/${network}`;
                    imgSocial.src = "../public/imgs/instagram.svg";

                }else if(type === "email" && network !== undefined){
                    linkSocial.href = `mailto:${network}`;
                    imgSocial.src = "../public/imgs/Email.svg";


                }else if(type === "telefone" && network !== undefined){
                    linkSocial.href = `tel:${network}`;
                    imgSocial.src = "../public/imgs/telefone.svg";
                }

                linkSocial.appendChild(imgSocial);
                itemSocial.appendChild(linkSocial);
                divSocial.appendChild(itemSocial);

            }

            handleNetwork(shelter.contato.telefone, "telefone")
            handleNetwork(shelter.contato.email, "email")
            handleNetwork(shelter.contato.instagram , "instagram")
            
            

            return divSocial.outerHTML;
        }

        function createItem(shelter:string, shelters:any ){
            
            sectionResult.insertAdjacentHTML('beforeend', (
                `<div class="item-main">
                        <div class="img">
                            <img class="img-main" src="${shelters[shelter].img}">
                            <a class="more-info" href="./citie-details.html" >
                                <img src="../public/imgs/arrow.svg"/>
                                <p>Saiba mais</p>
                            </a>
                        </div>
                        <div class="main-infos">
                            <div class="div-title-shelter">
                                <p class="title">${shelter}</p>
                            </div>

                            ${searchAnimals(shelters[shelter])}

                            ${searchSocialNetwork(shelters[shelter])}

                            <div>
                                <p class="add-info">${shelters[shelter].estado_extenso} - ${city}</p>
                            </div>
                        </div>
                    </div>`
            ));
            
        }

        const numberShelters = Object.keys(shelters).length;

        if(numberShelters <= 4 ){
            for(let shelter in shelters){
                createItem(shelter, shelters);
            }
        }else{

            let sheltersLocal:Array<string> = Object.keys(shelters);            
         
            let countAgroup = 1;

            while(sheltersLocal.length >= 1){
                let sheltersLocalDivide:Array<string> = sheltersLocal.slice(0,4);
                sheltersLocal.splice(0,4)
                
                const divAgroupShelters:HTMLDivElement = document.createElement('div');
                divAgroupShelters.classList.add('div-group');
                divAgroupShelters.dataset.count = countAgroup.toString();

                sectionResult.insertAdjacentElement('beforeend',divAgroupShelters);

                sheltersLocalDivide.forEach(shelter =>{
                   

                    divAgroupShelters.insertAdjacentHTML('beforeend',
                        `
                        <div class="item-main">
                            <div class="img">
                                <img class="img-main" src="${shelters[shelter].img}">
                                <a class="more-info" href="./citie-details.html" >
                                    <img src="../public/imgs/arrow.svg"/>
                                    <p>Saiba mais</p>
                                </a>
                            </div>
                            <div class="main-infos">
                                <div class="div-title-shelter">
                                    <p class="title">${shelter}</p>
                                </div>

                                ${searchAnimals(shelters[shelter])}

                                ${searchSocialNetwork(shelters[shelter])}

                                <div>
                                    <p class="add-info">${shelters[shelter].estado_extenso} - ${city}</p>
                                </div>
                            </div>
                        </div>
                        `
                    )
                });
                
                countAgroup ++;
            }     
            
            function createButtons(){

                function counterButtons(){
                    const divButtons:HTMLDivElement = document.createElement('div');
                    divButtons.classList.add('buttons-switch');
                    
                    for(let c = 1; c < countAgroup; c++ ){
                        const Button:HTMLButtonElement = document.createElement('button');
                        Button.textContent = c.toString();
                        Button.dataset.type = "button-switch";

                        if(c === 1 ){
                            Button.dataset.active = "true";
                        }else{
                            Button.dataset.active = "false";
                        }
                        
                    
                        Button.addEventListener('click',(event)=>{

                            const resetButtons = () =>{
                                const buttonsInactives = document.querySelectorAll('[data-type="button-switch"]');

                                buttonsInactives.forEach((item)=>{
                                    const button = item as HTMLButtonElement;
                                    let buttonDatasetActive = button.dataset.active;

                                    buttonDatasetActive == "true" ? button.setAttribute('data-active',"false"): false;
                                                    
                                })
                            }
                            
                            const activeButtonClick = ()=>{
                                const buttonLocal = (event.target as HTMLButtonElement);
                                buttonLocal.dataset.active == "true" ? false : buttonLocal.dataset.active = "true";
                            }

                            const handleGroupShelters = (value:string) =>{
                                
                                const divGroupActive:HTMLDivElement = document.querySelector(`div.div-group[data-count="${value}"]`) as HTMLDivElement;

                                divGroupActive.style.display = 'block';
                                
                                verifyButtons();
                                
                            }

                            resetButtons();
                            activeButtonClick();
                            handleGroupShelters((event.target as HTMLButtonElement).innerText);


                            
                        })
                        divButtons.insertAdjacentElement('beforeend',Button);
                    }
                    
                    sectionResult.insertAdjacentElement('beforeend', divButtons);

          
                }

                counterButtons();

                
            }
            function verifyButtons(){
                const buttonsFalse = document.querySelectorAll('button[data-active="false"]');
                
                buttonsFalse.forEach((element:any)=>{
                    hideGroup(element.textContent)
                })
               
            }
            function hideGroup(value:string){
                const groupsHide:NodeListOf<HTMLElement> = document.querySelectorAll(`.div-group[data-count="${value}"]`);

                groupsHide.forEach((group) =>{
                    group.style.display = "none";
                })
            }
            createButtons();
            verifyButtons();
        }
        
    }
}   
const citySearch = new CitySearch();