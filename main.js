/*Event listener when user clicks on the search icon*/
document.getElementById("search-btn").addEventListener("click",function(event){
    console.log(event);//Showing the mouse event on the log.
    event.preventDefault();//don't reload , display result immediately once search is clicked 
    let searchText = document.getElementById('title_input').value.trim();//get the value of the movie - title
    if (searchText == ""){
        alert("Please enter a film");// if the search text recieved is empty , alert to the user
    }
    else{
        $("#search_result").empty();// Ensure that the search results portion is empty everytime the user enters a movie to search. if this line doesnt exist it will just append to the prev result.
        $("#about-div").empty();
        getMovies(searchText);// Else , go ahead with retrieving the results
    }
})

/*function to retrieve data from the api after getting info from user*/
async function getMovies(searchText){
    //console.log(searchText);
    await fetch(`http://www.omdbapi.com?s=`+searchText+'&apikey=9a7c1c71')
    .then(Response => Response.json())
    .then(data => {
        console.log(data);//logging as one data

        /*If the movie is not found ,display an error message*/        
        if (data.Error == "Movie not found!"){
            $("#search_result").append(`
            <div class="not_found">
                <p>Search results for <span class="not-found-alert">${searchText}</span> not found</p>
                <p>Please enter another title</p>
            </div>`)      
        }
        
        /*Retrieve the results*/
        var movies = data.Search;
        console.log(movies);
        let styleName = ""; 

        /*Loop throught the mvoies information retrieved to extract specific data*/
        for(var i = 0; i < movies.length; i++) {
            var obj = movies[i];//Individual datas extracted from the nested portion

            if (obj.Poster == "N/A"){
                obj.Poster = "images/not-found-image.jpg";
                styleName = "na";
            }
            //logging object titles
            console.log(obj.Title);
            var id = obj.imdbID;
            var votes = obj.imdbVotes;
            //Append the results into the search results div to display to the user 
            $("#search_result").append(`
            <div class='movie-card'>
                <img class="${styleName}" src ="${obj.Poster}"></img>\
                <h5>${obj.Title}</h5>
                <button id="${id}" class="movie-card-btn" onclick="getInfo(this.id)">Learn More</button>
            </div>`)           
        }
    })
}

//The function that retrieves the data after the user clicks learn more. This function is called in the learn more button where it will get the id for that specific movie using 'this'
// There after it will call the function , passing the id to the function and retrieve the data from the api then display it throught a modal.
async function getInfo(id){
    console.log(id);
    $(".modal").css({"display":"block"});
    $('body').css("overflow", "hidden");//when i click learn more , i want the body aka the search result to be stagnent(not move).
    await fetch('http://www.omdbapi.com?i='+id+'&apikey=9a7c1c71')
    .then(Response => Response.json())
    .then(data => {

        //All the possible data I can retrieve from the api
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
        var type = data.Type;
        
        //If some data is not found / not applicable , I will ammend the results accoridngly
        if (BoxOffice==undefined){
            var BoxOffice = "N/A";
        }

        if(production == "N/A"||production == undefined){
            var production = "";
        }
            
        //If movie does not have a poster, then I will display a stock not found image.
        if(poster == "N/A"){
            var poster = "images/not-found-image.jpg";
        }

        //If the type of entertainment is a tv series then the age rating title will be amended.
        if (type == "series"){
            var TypeIdentify = "Television Age Rating : ";
        }

        //If the type of entertainment is a movie series then the age rating title will be amended.
        if (type == "movie"){
            var TypeIdentify = "Movie Age Rating : ";
        }

        //If the type of entertainment is a game then the age rating title will be amended.
        if (type == "game"){
            var TypeIdentify = "Game Age Rating : ";
        }

        //If there is not information on who produced the title, then nothing will be displayed.
        if (production == ""){
            var producedText = "";
        }

        //Else there will be a produced by text.
        else{
            var producedText = "Produced by";
        }
        
        //console.log(data);
        //console.log(poster);
        //console.log(title)
        //console.log(actors);
        //console.log(rated);
        //console.log(released);
        //console.log(imdbRating);
        //console.log(BoxOffice);

        //This will append the information into the modal that will activated when the learn more button is clicked.
        $(".modal-content").append(`
                                    <div class="information">
                                        <img src="${poster}" alt="movie poster">
                                    </div>

                                    <div class="information">
                                        <div>
                                            <h1 class="movie-title">${title}</h1>
                                        </div>

                                        <div class="rated-div">
                                            <p class="rated">${TypeIdentify} ${rated}</p>
                                        </div>

                                        <div class="actors-div">
                                            <p class="actors">Cast: ${actors}</p>
                                        </div>


                                        <div class="plot-div">
                                            <p class="plot">${synopsis}</p>
                                        </div>
                                        
                                        <div class="genre-div">
                                            <p class="highlights">${genre}</p>
                                            <p class="produced">${producedText} ${production}</p>  
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
                                                <p class="highlights">${imdbRating} / 10</p>
                                            </div>
                                            
                                            <div class="BoxOffice-div">
                                                <h3>Box Office:</h3>
                                                <p class="highlights">${BoxOffice}</p>
                                            </div>
                                        </div>
                                    </div>`);
        
        //When the close modal is clicked, The modal must be cleared in order for the next entertainment information to be appended.
        document.getElementById('close-modal').onclick = function(){
            $(".modal").css({"display":"none"});
            $(".modal-content").empty();
            $(".movie-title").empty();
            $('body').css("overflow", "auto");//when i close the modal, I want to scroll the search result if there is a overflow.
            $(".modal-content").append(`<button id = "close-modal">X</button>`);   
        }
    })
}

//Create an event listener for when the about site button is clicked. Call the method about when the about site button is clicked.
document.getElementById("about-btn").addEventListener("click",function(event){
    console.log(event);//Showing the mouse event on the log.
    event.preventDefault();//don't reload , display result immediately once search is clicked 
    $("#search_result").empty();
    about();
})

//Append the information into the the about div.
function about(){ 
    $("#about-div").html(`
        <div class="about-content">
            <h1 class="welcome">Welcome to the Entertainment Search Site</h1>
            <p>My name is Keerthana and I am the developer for this website. This website allows you to search for an entertainment title and learn more about it.</p>
            <p>This site is powered by OMDb API. The OMDb API is a RESTful web service to obtain movie information.</p>
            <p>Do contact me at the following social media platforms for further comments.</p>
        </div>
        <div class="socials">
            <a href="https://www.instagram.com/k.eer_/"><img src="socials/instagram.png" alt="instagram-icon"></a>
            <a href="https://github.com/keer1912"><img src="socials/github.png" alt="github-icon"></a>
            <a href="https://www.linkedin.com/in/keerthana-keshaini-a094ba1a9/"><img src="socials/linkedin.png" alt="linkedin-icon"></a>
        </div> 
    `);  
}


