document.getElementById("search-btn").addEventListener("click",function(event){
    console.log(event);//Showing the mouse event on the log.
    event.preventDefault();//don't reload , display result immediately once search is clicked 
    let searchText = document.getElementById('title_input').value.trim();//get the value of the movie - title

    if (searchText == ""){
        alert("Please enter a film");// if the search text recieved is empty , alert to the user
    }
    else{
        $("#search_result").empty();// Ensure that the search results portion is empty everytime the user enters a movie to search. if this line doesnt exist it will just append to the prev result.
        getMovies(searchText);// Else , go ahead with retrieving the results
    }
})
  
async function getMovies(searchText){
    //console.log(searchText);
    await fetch(`http://www.omdbapi.com?s=`+searchText+'&apikey=9a7c1c71')
    .then(Response => Response.json())
    .then(data => {
        console.log(data);//logging as one data

                
        if (data.Error == "Movie not found!"){
            $("#search_result").append(`
            <div class="not_found">
                <p>Movie not found , Please enter another title</p>
            </div>`)      
        }
    
        var movies = data.Search;
        //console.log(movies);
        let styleName = "";

        for(var i = 0; i < movies.length; i++) {
            var obj = movies[i];//Individual datas extracted from the nested portion

            if (obj.Poster == "N/A"){
                obj.Poster = "not-found-image.jpg";
                styleName = "na";
            }

            console.log(obj.Title);//logging object titles
            var id = obj.imdbID;
            $("#search_result").append(`
            <div class='movie-card'>
                <img class="${styleName}" src ="${obj.Poster}"></img>\
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
        var production = data.Production;
        
        if (BoxOffice==undefined){
            var BoxOffice = "N/A";
        }

        if(production == "N/A"||production == undefined){
            var production = "";
        }

        if(poster == "N/A"){
            var poster = "not-found-image.jpg";
        }

        //console.log(data);
        //console.log(poster);
        //console.log(title)
        //console.log(actors);
        //console.log(rated);
        //console.log(released);
        //console.log(imdbRating);
        //console.log(BoxOffice);
        $(".modal-content").append(`
                                    <div class="information">
                                        <img src="${poster}" alt="movie poster">
                                    </div>
                                         
                                    
                                    <div class="information">
                                        <h1 class="movie-title">${title}</h1>

                                        <div class="plot-div">
                                            <p class="plot">${synopsis}</p>
                                        </div>
                                        
                                        <div class="age-rating-div">
                                        </div>
                                        <div class="genre-div">
                                            <p class="highlights">${genre}</p>
                                            <p class="produced">${production}</p>  
                                        </div>

                                        <div class="split-information">
                                            <div class="released-div">
                                                <h3>Original Release:</h3>
                                                <p class="highlights">${released}</p>
                                            </div>
                                            
                                            <div class="runtime-div">
                                                <h3>Runtime:</h3>
                                                <p class="highlights">${runtime}</p>
                                            </div>
                                        </div>

                                        <div class= "split-information">
                                            <div class="imdbRating-div">       
                                                <h3>IMDB Rating:</h3>
                                                <p class="highlights">${imdbRating}/ 10</p>
                                            </div>
                                            
                                            <div class="BoxOffice-div">
                                                <h3>Box Office:</h3>
                                                <p class="highlights">${BoxOffice}</p>
                                            </div>
                                        </div>
                                    </div>`);
                                    
        document.getElementById('close-modal').onclick = function(){
            $(".modal").css({"display":"none"});
            $(".modal-content").empty();
            $(".movie-title").empty();
            $('body').css("overflow", "auto");//when i close the modal, I want to scroll the search result if there is a overflow.
            $(".modal-content").append(`<button id = "close-modal">X</button>`)    
        }
    })
}


