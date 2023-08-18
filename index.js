(function() {
    console.clear();        
    "use strict";
    function newsPortal() { 
        const cards = document.querySelector(".cmp-newsPortal__container__news__cards");
        const category = document.querySelector(".cmp-newsPortal__container__news__category");
        const categorySpan = document.querySelector(".cmp-newsPortal__container__news__category").querySelectorAll("span");
        const baseUrl = "https://newsapi.org/v2";
        const apiKey = "&apiKey=76f4ba917ea84bf3a9f4aa8b5e273cb5";
        const backupImage = "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80";
        // const usAll = "https://newsapi.org/v2/everything?q=tesla&from=2023-07-10&sortBy=publishedAt&apiKey=76f4ba917ea84bf3a9f4aa8b5e273cb5";
        // const usBusiness = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=76f4ba917ea84bf3a9f4aa8b5e273cb5";
        // const crypto = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=76f4ba917ea84bf3a9f4aa8b5e273cb5";
        // const urlTechCrunch = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=76f4ba917ea84bf3a9f4aa8b5e273cb5";
        async function dataRequest(url) {
            try{
                const response = await fetch(baseUrl + url + apiKey);
                const json = response.json();
                return json;
            }
            catch(error){
                console.log(error);
            }
        }
        function urlRequest(url) {        
            dataRequest(url).then((data) => {
                data.articles.forEach(item => {
                    cards.innerHTML += `<div class="cmp-newsPortal__container__news__cards__card">
                                            <div class="cmp-newsPortal__container__news__cards__card__image">
                                                <img src="${ item.urlToImage ? item.urlToImage : backupImage}" alt="image">
                                            </div>
                                            <div class="cmp-newsPortal__container__news__cards__card__information">
                                                <div class="cmp-newsPortal__container__news__cards__card__information__section">
                                                    <p class="cmp-newsPortal__container__news__cards__card__information__section--title">${item.title}</p>
                                                    <p class="cmp-newsPortal__container__news__cards__card__information__section--description">${item.description}</p>
                                                    <p class="cmp-newsPortal__container__news__cards__card__information__section--time">
                                                        <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                                                        <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                                                    </p>
                                                </div>
                                                <div class="cmp-newsPortal__container__news__cards__card__information__other">
                                                    <span class="cmp-newsPortal__container__news__cards__card__information__other--source">${item.source.name}</span>
                                                    <a class="cmp-newsPortal__container__news__cards__card__information__other--url" href="${item.url}" target="_blank">Read Article &rarr;</a>
                                                </div>
                                            </div>
                                        </div>`;
                });
            });
        }
        category.addEventListener("click", (event) => {
            if(event.target.tagName === "SPAN"){
                cards.innerHTML = "";
                urlRequest(event.target.dataset.id);
                categorySpan.forEach(item => {
                    item.classList.remove("cmp-newsPortal__container__news__category--active");
                });                    
                event.target.classList.add("cmp-newsPortal__container__news__category--active");
            }            
        });
        urlRequest("/top-headlines?country=us&category=business");
    }
    newsPortal();  
}());
