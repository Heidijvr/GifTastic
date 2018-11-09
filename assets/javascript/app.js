
//Gifs play and pause!!!
var gifClick = function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
};

//Event listener for all button elements
// Gif display triggered by button!!!
var buttonClick = function()  {
    
    //this refers to button that was clicked
    var person = $(this).attr("data-person");
    console.log('Clicked:', person);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        encodeURI(person) + "&api_key=NyITjycRvRjs0DSBiSLflQ0nO8ONHB7X&limit=10";

    console.log(queryURL);

    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response) {
        $("#gifs-appear-here").empty();
        var results = response.data;
        for (var i = 0; i < results.length; i++) {

            console.log(results[i].rating);
            var rating = results[i].rating;
        
            var imageResult = results[i].images;
            console.log(imageResult.fixed_width.url);
            var imageToAdd = $("<img>");
            var p = $("<p>");           
            p.text(rating);          
            //imageToAdd.append("<p> Rating: " + rating + "</p>");
            imageToAdd.addClass("gif");
            imageToAdd.attr("src", imageResult.fixed_width_still.url);
           
            imageToAdd.attr("data-animate", imageResult.fixed_width.url);
            imageToAdd.attr("data-still", imageResult.fixed_width_still.url);
            imageToAdd.attr("data-state", "still");
            
            imageToAdd.on('click', gifClick);
            $("#gifs-appear-here").append(imageToAdd);
            $("#gifs-appear-here").append(p);
        } 
    });
};


var topics = ["John Cleese", "Ricky Gervais", "Sacha Baron Cohen", "Jerry Seinfeld", "Will Smith", "Jack Nicholson", "Meryl Streep", "Sameul L. Jackson", "Natalie Portman", "Idris Elba", "Ralph Fiennes", "Sean Connery", "Judi Dench", "Kate Winslet", "Keira Knightley", "Anthony Hopkins", "Liam Neeson"];

var renderButtons = function() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        console.log(topics[i]);
        var buttonToAdd = $("<button>");
        buttonToAdd.text(topics[i]);
        buttonToAdd.attr("data-person", topics[i]);
        buttonToAdd.on('click', buttonClick);

        $("#buttons").append(buttonToAdd);
    }
}

renderButtons();

$("#submit").on("click", function() {
    var name = $("#nameInput").val().trim();
    event.preventDefault();
    topics.push(name);
    renderButtons();
}); 

/*
   
    // After data comes back from the API
    .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;
        // looping over every result item
        for (var i = 0; i <results.length; i++) {

            //add rating!!!
            // Creating image tag
            var personImage = $("<img>");

            // GIving image tag an src attribute of a property pulled from the reult item
            personImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage to the gifDiv we created
            gifDIv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);

        }

*/