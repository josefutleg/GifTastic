var topics = ['puppies', 'kitties', 'cubs'];
var button;
var rating = ['y','g','pg','pg-13','r'];
//giphy api key uREZoMju3bSu2Sho19kTyRgJr6Tvhfhg


for (i in topics){
    button = $('<button>').addClass('btn btn-outline-primary').attr('id', 'newButton');
    button.append(topics[i]);
    $('.topicsContainer').prepend(button);
};

$('button').on('click', function(){
    event.preventDefault();
    var input = $('input').val();
    topics.push(input);
    
    if (input != ""){
        var b = $('<button>').addClass('btn btn-outline-primary').attr('id', 'newButton');
        b.text(input);
        $('.topicsContainer').prepend(b);
        $('input').val("");
    }

});

$('.topicsContainer').on('click', 'button', function(){
    $('.gifContainer').empty();
topicButton = $(this).text();
var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=uREZoMju3bSu2Sho19kTyRgJr6Tvhfhg&limit=5&tag=" + topicButton;
console.log(queryURL);
for (i=0; i<20; i++){
    $.ajax({url: queryURL})
    .then(function(response){
        console.log(response);

    var makeImg = $('<img>').attr('src', response.data.fixed_height_small_still_url).attr('data-still',response.data.fixed_height_small_still_url).attr('data-animate',response.data.image_url).attr('data-state', 'still').addClass('gif');
    
    $('.gifContainer').append(makeImg);
    // $('.gifContainer').text(JSON.stringify(response));

    });

}


});

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




