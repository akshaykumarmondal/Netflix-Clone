
var interval = setInterval(function(){
    var countForVideo = document.getElementById('video').readyState;
    if(countForVideo == 4){
      document.getElementById('video').play();
      clearInterval(interval);
    }
  },2000);


const left_btn = document.getElementsByClassName('bi-chevron-left')[0];
const right_btn = document.getElementsByClassName('bi-chevron-right')[0];

const cards = document.getElementsByClassName('cards')[0];

const search = document.getElementsByClassName('search')[0];

const search_input = document.getElementById("search_input");

left_btn.addEventListener('click',()=>{

    cards.scrollLeft -= 140;
});
right_btn.addEventListener('click',()=>{

    cards.scrollLeft += 140;
});

let json_url = "movie.json";

fetch(json_url).then(Response => Response.json())
    .then((data)=> {

        data.forEach((movie, index)=>{

            let {name,imdb,date,sposter,bposter,genre,url} = movie

            let card = document.createElement('a');
            card.classList.add('card');
            card.href=url;
            card.innerHTML+=`
            <img class="movie-poster" src="${sposter}" alt="${name}">
            <div class="rest-card">
                <img src="${bposter}" alt="">

                <div class="cont">
                    <h4>${name}</h4>
                    <div class="sub">
                        <p>${genre}, ${date}</p>
                        <h3><span>IMDB</span>&#11088;${imdb}</h3>
                    </div>
                </div>
            </div>
            `
            cards.appendChild(card);
        })

        document.getElementById('title').innerText = data[0].name;

        document.getElementById('gen').innerText = data[0].genre;

        document.getElementById('date').innerText = data[0].date;

        document.getElementById('rate').innerHTML = `<span>IMDB</span>&#11088;${data[0].imdb}</h3>`
    
        //data suggestions on search

        data.forEach((movie) => {

            let{ name, imdb , date, sposter,genre, url} =movie;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href=url;
            card.innerHTML+=`
                        <img src="${sposter}" alt="">

                        <div class="content">
                            <h3>${name}</h3>
                            <p>${genre}, ${date}, <span>IMDB</span>&#11088;${imdb}</p>
                        </div>
                    </a>
            `
            search.appendChild(card);
        });

        //suggestion filter

        search_input.addEventListener('keyup', ()=>{

            let filter = search_input.value.toUpperCase();
            let a = search.getElementsByTagName('a');

            for(let index = 0; index<a.length; index++){
                let b = a[index].getElementsByClassName('content')[0];

                // console.log(a.textContent);

                let TextValue = b.textContent || b.innerText;

                if(TextValue.toUpperCase().indexOf(filter)>-1){

                    a[index].style.display = "flex";
                    search.style.visibility = "visible";
                    search.style.opacity = 1;
                }
                else{

                    a[index].style.display = "none";
                }

                if(search_input.value == 0){

                    search.style.visibility = "hidden";
                    search.style.opacity = 0;

                }
            }
        })

        let video = document.getElementsByTagName('video')[0];

        let play = document.getElementById('play');

        play.addEventListener('click',()=>{

            if(video.paused){

                video.play();
                play.innerHTML = `Play <i class="bi bi-pause fill"></i>`
            }
            else{
    
                video.pause();
                play.innerHTML = `Pause <i class="bi bi-play fill"></i>`
            }
        })

        

    });