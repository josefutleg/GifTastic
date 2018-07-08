var topics = ['puppies', 'kitties', 'funny', 'scary', 'dinosaurs'];
var button;
var rating = [];
var topicButton = [];
var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=uREZoMju3bSu2Sho19kTyRgJr6Tvhfhg&limit=25&tag=" + topicButton + "&rating=" + rating;

//giphy api key uREZoMju3bSu2Sho19kTyRgJr6Tvhfhg

// loads initial topics from topics array
for (i in topics){
    button = $('<button>').addClass('btn btn-outline-primary').attr('id', 'newButton');
    button.append(topics[i]);
    $('.topicsContainer').prepend(button).fadeIn();
};

// onclick function that will take input value
$('button').on('click', function(){
    event.preventDefault();
    var input = $('input').val();
       
    if (input != ""){
        var b = $('<button>').addClass('btn btn-outline-primary').attr('id', 'newButton');
        b.text(input);
        $('.topicsContainer').prepend(b);
        $('input').val("");
    }
    else if (input == ''){
        return;
    }
    topics.push(input); 
});

//function that will take in user's rating selection
$('select').on('change', function(){
// once rating is selected, it will go up to the global variable rating so it can be called in other funcions
    rating = $(this).val();
});

//keypress function for pressing enter once input is typed. 
$('input').keypress('change', function(e){
    var input = $('input').val();
    //if statement prevents empty buttons to display and empty values to be pushed into topics array
    if (input === '' && e.which === 13){
        return false;
}
    if (e.which == 13){
        event.preventDefault();
        var b = $('<button>').addClass('btn btn-outline-primary').attr('id', 'newButton');
        b.text(input);
        $('.topicsContainer').prepend(b);
        $('input').val("");
        topics.push(input);
}

});

function getGifs(){
    queryURL;

    $.ajax({
        url: queryURL,
        method: "GET",
        cache: false
    })
    .then(function(response){
    var imgDiv = $('<div>').addClass('image')
    var makeImg = $('<img>').attr('src', response.data.fixed_height_small_still_url).attr('data-still',response.data.fixed_height_small_still_url).attr('data-animate',response.data.image_url).attr('data-state', 'still').addClass('gif');
    var dataTag = $('<span>').text(response.data.title).attr('id','title');
    var dataRating = $('<span>').text(rating).attr('id','rating');
    var downloadTag = $(`<a href=${response.data.image_url} download>`).addClass('fas fa-arrow-alt-circle-down');

    // if user chooses 'pg-13' then the text shown in the gif's rating with be shortened to show '13'
    if (rating == 'PG-13'){
            dataRating.text(13);
        }

    imgDiv.append(dataRating);
    imgDiv.append(downloadTag);
    imgDiv.append(dataTag);
    imgDiv.append(makeImg);
    $('.gifContainer').prepend(imgDiv);
    });
}

//on click function for buttons
$('.topicsContainer').on('click', 'button', function(){
    //i used this if i wanted to empty the topicsContainer div for every new search
    // $('.gifContainer').empty();
topicButton = $(this).text();
var input = $('input').val();
queryURL = "https://api.giphy.com/v1/gifs/random?api_key=uREZoMju3bSu2Sho19kTyRgJr6Tvhfhg&limit=25&tag=" + topicButton + "&rating=" + rating;
console.log(queryURL);
// if statement that will prevent the function to run if a rating isn't chosen
    if (rating == ''){
        alert('choose a rating');
        return;
    }
    else if (rating == 'rating'){
        alert('choose a rating');
        return;
    }
// loop that will run getGifs function. will pull 20 gifs to display on page.
for (i=0; i<=20; i++){
    getGifs();
}
});

// on click function that animates or stops the gifs
$(document).on('click','img', function(){
    var state = $(this).attr('data-state');
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});




