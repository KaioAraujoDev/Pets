var __awaiter=this&&this.__awaiter||function(t,d,r,o){return new(r=r||Promise)(function(i,e){function a(t){try{n(o.next(t))}catch(t){e(t)}}function s(t){try{n(o.throw(t))}catch(t){e(t)}}function n(t){var e;t.done?i(t.value):((e=t.value)instanceof r?e:new r(function(t){t(e)})).then(a,s)}n((o=o.apply(t,d||[])).next())})};class CitySearch{constructor(){this.inputCity=document.querySelector("#input-cidade"),this.formSearchCity=document.querySelector("#form-search-city"),this.divCidades=document.querySelector("#div-cidades"),this.valorDigitado="",this.estadoSelecionado="",this.dataCities=[{}],this.citiesFinded=[""],this.getDataCities().then(t=>{this.dataCities=t,this.addEvents()}).catch(t=>{alert(t)})}addEvents(){this.inputCity.addEventListener("keyup",t=>{this.valorDigitado=t.target.value,this.findCity(this.valorDigitado,this.estadoSelecionado)}),document.querySelector(".div-select").addEventListener("click",()=>{var t=document.querySelector("#ul-list-states");"false"===t.getAttribute("data-active")?t.setAttribute("data-active","true"):t.setAttribute("data-active","false")}),document.querySelectorAll("#ul-list-states li").forEach(t=>{t.addEventListener("click",t=>{t=t.target.getAttribute("value");document.querySelector("#output-selected-item").textContent=t,this.estadoSelecionado=t,this.findCity(this.valorDigitado,this.estadoSelecionado)})}),this.formSearchCity.addEventListener("submit",t=>{t.preventDefault(),this.findInfosShelter()})}getDataCities(){return __awaiter(this,void 0,void 0,function*(){return yield(yield fetch("../data/cities.json")).json()})}findCity(e,i){return __awaiter(this,void 0,void 0,function*(){var t=Object.keys(this.dataCities.cidades);this.citiesFinded=t.filter(t=>""!==i&&t.toLowerCase().includes(e.toLowerCase())&&""!==e?this.filterCityInStateNCity(t):t.toLowerCase().includes(e.toLowerCase())&&""!==e?(this.divCidades.style="display:block",!0):!(this.divCidades.style="display:none")),this.showCity()})}filterCityInStateNCity(t){for(var e in this.dataCities.cidades[t])return this.dataCities.cidades[t][e].estado===this.estadoSelecionado&&(this.divCidades.style="display:block",!0)}showCity(){this.divCidades.innerHTML="",this.citiesFinded.forEach(t=>{var e=document.createElement("div");e.textContent=t,e.addEventListener("click",t=>{this.inputCity.value=null!=(t=t.target.textContent)?t:""}),this.divCidades.appendChild(e)})}findInfosShelter(){var t=Object.keys(this.dataCities.cidades).sort().find(t=>this.inputCity.value.toLowerCase()===t.toLowerCase()),e=this.dataCities.cidades[t];this.showInfosSheltersFinded(e,t)}showInfosSheltersFinded(i,a){const t=document.querySelector("#result"),s=(t.innerHTML="",document.createElement("ul"));function n(t){var e,i=[];for(e in s.innerHTML="",t.animais)i.push(t.animais[e]);return i.forEach(t=>{var e=document.createElement("li");e.textContent=t,s.appendChild(e)}),s.outerHTML}function d(t){const n=document.createElement("ul");function e(t,e){var i=document.createElement("li"),a=document.createElement("a"),s=document.createElement("img");"instagram"===e&&void 0!==t?(a.href="https://www.instagram.com/"+t,s.src="/assets/imgs/instagram.svg"):"email"===e&&void 0!==t?(a.href="mailto:"+t,s.src="/assets/imgs/Email.svg"):"telefone"===e&&void 0!==t&&(a.href="tel:"+t,s.src="/assets/imgs/telefone.svg"),a.appendChild(s),i.appendChild(a),n.appendChild(i)}return n.classList.add("social"),e(t.contato.telefone,"telefone"),e(t.contato.email,"email"),e(t.contato.instagram,"instagram"),n.outerHTML}s.classList.add("animals");var e;if(Object.keys(i).length<=4)for(var r in i)r=r,e=i,t.insertAdjacentHTML("beforeend",`<div class="item-main">
                        <div class="img">
                            <img class="img-main" src="${e[r].img}">
                            <a class="more-info" href="javascript:void(0)" type="link-more-info-shelter" data-cities=${JSON.stringify(e[r])}>
                                <img src="../assets/imgs/arrow.svg"/>
                                <p>Saiba mais</p>
                            </a>
                        </div>
                        <div class="main-infos">
                            <div class="div-title-shelter">
                                <p class="title">${r}</p>
                            </div>

                            ${n(e[r])}

                            ${d(e[r])}

                            <div>
                                <p class="add-info">${e[r].estado_extenso} - ${a}</p>
                            </div>
                        </div>
                    </div>`);else{var o=Object.keys(i);let e=1;for(;1<=o.length;){var c=o.slice(0,4);o.splice(0,4);const h=document.createElement("div");h.classList.add("div-group"),h.dataset.count=e.toString(),t.insertAdjacentElement("beforeend",h),c.forEach(t=>{h.insertAdjacentHTML("beforeend",`
                        <div class="item-main">
                            <div class="img">
                                <img class="img-main" src="${i[t].img}">
                                <a class="more-info" href="javascript:void(0)" type="link-more-info-shelter" data-cities=${(t=>{const e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","“":"&#8220;","”":"&#8221;"," ":"&nbsp;"};return t.replace(/[&<>"'“” ]/g,function(t){return e[t]})})(JSON.stringify(i[t]))}>
                                    <img src="../assets/imgs/arrow.svg"/>
                                    <p>Saiba mais</p>
                                </a>
                            </div>
                            <div class="main-infos">
                                <div class="div-title-shelter">
                                    <p class="title">${t}</p>
                                </div>

                                ${n(i[t])}

                                ${d(i[t])}

                                <div>
                                    <p class="add-info">${i[t].estado_extenso} - ${a}</p>
                                </div>
                            </div>
                        </div>
                        `)}),e++}function l(){document.querySelectorAll('button[data-active="false"]').forEach(t=>{t=t.textContent;(t=document.querySelectorAll(`.div-group[data-count="${t}"]`)).forEach(t=>{t.style.display="none"})})}var u=document.createElement("div");u.classList.add("buttons-switch");for(let t=1;t<e;t++){var v=document.createElement("button");v.textContent=t.toString(),v.dataset.type="button-switch",1===t?v.dataset.active="true":v.dataset.active="false",v.addEventListener("click",t=>{var e;document.querySelectorAll('[data-type="button-switch"]').forEach(t=>{"true"==t.dataset.active&&t.setAttribute("data-active","false")}),"true"!=(e=t.target).dataset.active&&(e.dataset.active="true"),e=t.target.innerText,document.querySelector(`div.div-group[data-count="${e}"]`).style.display="block",l()}),u.insertAdjacentElement("beforeend",v)}t.insertAdjacentElement("beforeend",u),l()}document.querySelectorAll('[type="link-more-info-shelter"]').forEach(t=>{t.addEventListener("click",t=>{t=null!=(t=null==(t=(t=t).currentTarget instanceof HTMLAnchorElement?t.currentTarget:null)?void 0:t.dataset.cities)?t:"",localStorage.setItem("shelter",t),window.location.href="citie-details.html"})})}}const citySearch=new CitySearch;export{CitySearch};