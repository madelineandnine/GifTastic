<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

var topics = ["Michael Scott", "Ron Swanson", "Dwight Schrute", "Leslie Knope", "Liz Lemon", "Jim and Pam"];

    function displayTopics() {
        var topic = encodeURIComponent($(this).data("name"));

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=FgZQ2YXypyCuo4Jka4Jza8vBTjKv7t3z&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for(var i=0; i < response.data.length; i++) {
            console.log(response);
            var gifDiv = $("<div class='gif'>");
            var stillURL = response.data[i].images.original_still.url;
            var animateURL = response.data[i].images.original.url;
            var gif = $("<img class='imggif'>").attr("src", stillURL);
            gif.attr("data-still", stillURL);
            gif.attr("data-animate", animateURL);
            gif.attr("data-state", "still");
            gifDiv.append(gif);
            $("#gif-response").prepend(gifDiv);
        }
        });
    }

    function swapSource() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }
    

    function renderButtons() {
        $("#special-buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var buttons = $('<button class="btn btn-primary gif-btn">');
            buttons.attr("data-name", topics[i]);
            buttons.text(topics[i]);
            $('#special-buttons').append(buttons);
        }
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var newGif = $("#gif-input").val().trim();
        topics.push(newGif);
        renderButtons();
        $('#gif-input').val('');
    });

$('#special-buttons').on("click", ".gif-btn", displayTopics);
$('#gif-response').on("click", ".imggif", swapSource);
 renderButtons();


