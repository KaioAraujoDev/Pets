//POO Version
export class CitySearch{
    private inputCity: HTMLInputElement;
    private inputEstado: HTMLInputElement;
    private valorDigitado: string; 
    private estadoSelecionado: string;
    private dataCities: any;
    private divCidades: any;
    private citiesFinded: string[];
    private formSearchCity: Element;
    private infosShelterFinded: any;

    constructor(){
        this.inputCity = document.querySelector('#input-cidade') as HTMLInputElement;
        this.inputEstado = document.querySelector('#input-estado') as HTMLInputElement;
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
        this.inputEstado.addEventListener("change", (event)=>{
            this.estadoSelecionado = (event.target as HTMLInputElement).value;
            this.findCity(this.valorDigitado, this.estadoSelecionado);
        })

        const divSelect = document.querySelector(".div-select") as Element;
        
        divSelect.addEventListener("click", ()=>{
            const listItens = document.querySelector("#ul-list-states") as Element;
        
            listItens.setAttribute('data-active', 'true');
            
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
        const listAnimals = document.createElement('ul');
        listAnimals.classList.add('animals')

        
        
        function searchAnimals(shelter:any){
            const animals = [];

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
            
            handleNetwork(shelter.contato.instagram , "instagram")
            handleNetwork(shelter.contato.email, "email")
            handleNetwork(shelter.contato.telefone, "telefone")

            return divSocial.outerHTML;
        }

        for(let shelter in shelters){
            sectionResult.innerHTML = `
                <div class="item-main">
                    <div class="img">
                        <img class="img-main" src="${shelters[shelter].img}">
                        <div class="more-info">
                            <img src="../public/imgs/arrow.svg"/>
                            <a href="./citie-details.html">Saiba mais</a>
                        </div>
                    </div>
                    <div class="main-infos">
                        <p>${shelter}</p>
                        
                        ${searchAnimals(shelters[shelter])}

                        ${searchSocialNetwork(shelters[shelter])}

                        <div>
                            <p>${shelters[shelter].estado_extenso} - ${city}</p>
                        </div>
                    </div>
                </div>
            `;
            
        }
        
    }
}   
const citySearch = new CitySearch();