document.getElementById("search-btn").addEventListener("click",function(event){
    console.log(event);
    event.preventDefault();//don't reload , display result immediately once search is clicked 
    let searchText = document.getElementById('title_input').value.trim();

    if (searchText == ""){
        alert("Please enter a film");
    }
    else{
        $("#search_result").empty();
        getMovies(searchText);
    }
})

async function getMovies(searchText){
    //console.log(searchText);
    await fetch(`http://www.omdbapi.com?s=`+searchText+'&apikey=9a7c1c71')
    .then(Response => Response.json())
    .then(data => {
        console.log(data)//logging as one data
        var movies = data.Search;
        //console.log(movies);
        
        for(var i = 0; i < movies.length; i++) {
            var obj = movies[i];//Individual datas extracted from the nested portion
            console.log(obj.Title);//logging object titles
            var id = obj.imdbID;
            
            $("#search_result").append(`
            <div class='movie-card'>
                <img src ="${obj.Poster}"></img>\
                <h5>${obj.Title}</h5>
                <button id="${id}" onclick="getInfo(this.id)">Learn More</button>
            </div>`)           
        }
    })
}



async function getInfo(id){
    console.log(id);
    $(".modal").css({"display":"block"});
    $('body').css("overflow", "hidden");//when i click learn more , i want the body aka the search result to be stagnent(not move).
    await fetch('http://www.omdbapi.com?i='+id+'&apikey=9a7c1c71')
    .then(Response => Response.json())
    .then(data => {
        var poster = data.Poster;
        var title = data.Title;
        var actors = data.Actors;
        var rated = data.Rated;
        var released = data.Released;
        var imdbRating = data.imdbRating;
        var BoxOffice = data.BoxOffice;
        var synopsis = data.Plot;
        var genre = data.Genre;
        var director = data.Director;
        var runtime = data.Runtime;
        //console.log(data);
        //console.log(poster);
        //console.log(title)
        //console.log(actors);
        //console.log(rated);
        //console.log(released);
        //console.log(imdbRating);
        //console.log(BoxOffice);
        
        $(".modal-content").append(`
                                    <div class="split">
                                        
                                        <img src="${poster}" class="poster-in-modal" alt="movie poster">
                                    </div>       
                                    
                                    <div class="information">
                                        <h3 class="movie-title">${title}</h3>

                                        <div class="plot-div">
                                            <p>${synopsis}<p/>
                                        </div>
                                        
                                        <div class="genre-div">
                                            <h4>${genre}</h4>
                                        </div>

                                        <div class="director-div">
                                            <h4>Directed by : ${director}</h4>
                                        </div>

                                        <div class="split-information">
                                            <div class="released-div">
                                                <h3>Original Release:</h3>
                                                <h4>${released}</h4>
                                            </div>
                                            
                                            <div class="runtime-div">
                                                <h3>Runtime:</h3>
                                                <h4>${runtime}</h4>
                                            </div>
                                        </div>

                                        <div class= "split-information">
                                            <div class="imdbRating-div">       
                                                <h3>IMDB Rating:</h3>
                                                <h4>${imdbRating}/10</h4>
                                            </div>
                                            
                                            <div class="BoxOffice-div">
                                                <h3>Box Office:</h3>
                                                <h4>${BoxOffice}</h4>
                                            </div>
                                        </div>

                                    </div>`);
                                    
        document.getElementById('close-modal').onclick = function(){
            $(".modal").css({"display":"none"});
            $(".modal-content").empty();
            $(".movie-title").empty();
            $('body').css("overflow", "auto");//when i close the modal, I want to scroll the search result if there is a overflow.
        }
    })
}


