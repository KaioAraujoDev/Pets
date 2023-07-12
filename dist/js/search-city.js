var __awaiter=this&&this.__awaiter||function(t,d,o,r){return new(o=o||Promise)(function(i,e){function a(t){try{n(r.next(t))}catch(t){e(t)}}function s(t){try{n(r.throw(t))}catch(t){e(t)}}function n(t){var e;t.done?i(t.value):((e=t.value)instanceof o?e:new o(function(t){t(e)})).then(a,s)}n((r=r.apply(t,d||[])).next())})};class CitySearch{constructor(){this.inputCity=document.querySelector("#input-cidade"),this.inputEstado=document.querySelector("#input-estado"),this.formSearchCity=document.querySelector("#form-search-city"),this.divCidades=document.querySelector("#div-cidades"),this.valorDigitado="",this.estadoSelecionado="",this.dataCities=[{}],this.citiesFinded=[""],this.getDataCities().then(t=>{this.dataCities=t,this.addEvents()}).catch(t=>{alert(t)})}addEvents(){this.inputCity.addEventListener("keyup",t=>{this.valorDigitado=t.target.value,this.findCity(this.valorDigitado,this.estadoSelecionado)}),this.inputEstado.addEventListener("change",t=>{this.estadoSelecionado=t.target.value,this.findCity(this.valorDigitado,this.estadoSelecionado)}),document.querySelector(".div-select").addEventListener("click",()=>{document.querySelector("#ul-list-states").setAttribute("data-active","true")}),this.formSearchCity.addEventListener("submit",t=>{t.preventDefault(),this.findInfosShelter()})}getDataCities(){return __awaiter(this,void 0,void 0,function*(){return yield(yield fetch("../data/cities.json")).json()})}findCity(e,i){return __awaiter(this,void 0,void 0,function*(){var t=Object.keys(this.dataCities.cidades);this.citiesFinded=t.filter(t=>""!==i&&t.toLowerCase().includes(e.toLowerCase())&&""!==e?this.filterCityInStateNCity(t):t.toLowerCase().includes(e.toLowerCase())&&""!==e?(this.divCidades.style="display:block",!0):!(this.divCidades.style="display:none")),this.showCity()})}filterCityInStateNCity(t){for(var e in this.dataCities.cidades[t])return this.dataCities.cidades[t][e].estado===this.estadoSelecionado&&(this.divCidades.style="display:block",!0)}showCity(){this.divCidades.innerHTML="",this.citiesFinded.forEach(t=>{var e=document.createElement("div");e.textContent=t,e.addEventListener("click",t=>{this.inputCity.value=null!=(t=t.target.textContent)?t:""}),this.divCidades.appendChild(e)})}findInfosShelter(){var t=Object.keys(this.dataCities.cidades).sort().find(t=>this.inputCity.value.toLowerCase()===t.toLowerCase()),e=this.dataCities.cidades[t];this.showInfosSheltersFinded(e,t)}showInfosSheltersFinded(t,e){var i,a=document.querySelector("#result");const s=document.createElement("ul");for(i in s.classList.add("animals"),t)a.innerHTML=`
                <div class="item-main">
                    <div class="img">
                        <img class="img-main" src="${t[i].img}">
                        <div class="more-info">
                            <img src="../public/imgs/arrow.svg"/>
                            <a href="./citie-details.html">Saiba mais</a>
                        </div>
                    </div>
                    <div class="main-infos">
                        <p>${i}</p>
                        
                        ${function(t){var e,i=[];for(e in t.animais)i.push(t.animais[e]);return i.forEach(t=>{var e=document.createElement("li");e.textContent=t,s.appendChild(e)}),s.outerHTML}(t[i])}

                        ${function(t){const n=document.createElement("ul");function e(t,e){var i=document.createElement("li"),a=document.createElement("a"),s=document.createElement("img");"instagram"===e&&void 0!==t?(a.href="https://www.instagram.com/"+t,s.src="../public/imgs/instagram.svg"):"email"===e&&void 0!==t?(a.href="mailto:"+t,s.src="../public/imgs/Email.svg"):"telefone"===e&&void 0!==t&&(a.href="tel:"+t,s.src="../public/imgs/telefone.svg"),a.appendChild(s),i.appendChild(a),n.appendChild(i)}return n.classList.add("social"),e(t.contato.instagram,"instagram"),e(t.contato.email,"email"),e(t.contato.telefone,"telefone"),n.outerHTML}(t[i])}

                        <div>
                            <p>${t[i].estado_extenso} - ${e}</p>
                        </div>
                    </div>
                </div>
            `}}const citySearch=new CitySearch;export{CitySearch};