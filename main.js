document.getElementById("search-btn").addEventListener("click",function(event){
    console.log(event);
    event.preventDefault();//don't reload , display result immediately once search is clicked 
    let searchText = document.getElementById('title_input').value.trim();
    $("#search_result").empty();
    getMovies(searchText);
})

function getMovies(searchText){
    console.log(searchText);

    fetch(`http://www.omdbapi.com?s=`+searchText+'&apikey=9a7c1c71')
    .then(Response => Response.json())
    .then(data => {
        //console.log(data)//logging as one data
        var movies = data.Search;//logging nested datas
        //console.log(movies);
        
        for(var i = 0; i < movies.length; i++) {
            var obj = movies[i];//Individual datas extracted from the nested portion
            console.log(obj.Title);//logging object titles
            var id = obj.imdbID;
            document.getElementById("search_result").innerHTML += `<div>
            <img src ="${obj.Poster}"></img>
            <h5>${obj.Title}</h5>
            <button id="${id}" onclick="getInfo(this.id)">Learn More</button>
            </div><br>`;//+= to keep adding on after each set. 
            //the this keyword will only retreive info for the movie that I select for.
        }
    })
}

function getInfo(id){
    //console.log(id);
    $(".modal").css({"display":"block"});
    fetch('http://www.omdbapi.com?i='+id+'&apikey=9a7c1c71')
    .then(Response => Response.json())
    .then(data => {
        var poster = data.Poster;
        var title = data.Title;
        var actors = data.Actors;
        var rated = data.Rated;
        var released = data.Released;
        var imdbRating = data.imdbRating;
        var BoxOffice = data.BoxOffice;
        //console.log(data);
        //console.log(poster);
        //console.log(title)
        //console.log(actors);
        //console.log(rated);
        //console.log(released);
        //console.log(imdbRating);
        //console.log(BoxOffice);

        $(".modal-content").append(`<h2>${title}</h2>
                                    <img src="${poster}" class="poster-in-modal" alt="movie poster">\

                                    <div class="actors-div">
                                        <h3>Actors</h3>
                                        <h4>${actors}</h4>
                                    </div>

                                    <div class="released-div">
                                    <h3>Released</h3>
                                    <h4>${released}</h4>
                                    </div>
                                    
                                    <div class="imdbRating-div">
                                    <h3>IMDB Rating</h3>
                                    <h4>${imdbRating}</h4>
                                    </div>
                                    
                                    <div class="BoxOffice-div">
                                    <h3>IMDB Rating</h3>
                                    <h4>${BoxOffice}</h4>
                                    </div>`);

        document.getElementById('close-modal').onclick = function(){
            $(".modal").css({"display":"none"});
            $(".modal-content").empty();
        }
    })
}
