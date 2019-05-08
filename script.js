(function() {
    var results = $('#results');
    var img = 'default.jpg';
    $('#go').on('click', function() {
        $.ajax({
            url: 'https://elegant-croissant.glitch.me/spotify',
            data: {
                q: $('input').val(),
                type: $('select').val(),
            },
            success: function(data) {
                data = data.artists || data.albums;
                var resultsHtml = '';

                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images[0]) {
                        resultsHtml += '<div class="searchResult"><a href="' +
                            data.items[i].external_urls.spotify +
                            '"><img src="' +
                            data.items[i].images[0].url +
                            '"><h4>' +
                            data.items[i].name +
                            '</h4></a></div>';
                    } else {
                        '<div class="searchResult"><a href="' +
                            data.items[i].external_urls.spotify +
                            '"><img src="https://vignette.wikia.nocookie.net/krewella/images/5/51/NoImage.png"><h4>' +
                            data.items[i].name +
                            '</h4></a></div>';
                    }
                }

                $('.ab').html($('input').val());

                results.html(resultsHtml);

                checkForNextItems(data);
            },
        });
    });

    function checkForNextItems(data) {
        if (data.next) {
            $('#results').append('<button id="more">MORE</button>');
            $('#more').on('click', function() {
                handleButtonClick(data);
            });
        }
    }

    function handleButtonClick(data) {
        $('#more').remove();
        var nextUrl = data.next.replace(
            'api.spotify.com/v1/search',
            'elegant-croissant.glitch.me/spotify',
        );
        fetchAndInject(nextUrl);
    }

    function fetchAndInject(nextUrl) {
        $.ajax({
            url: nextUrl,
            success: function(data) {
                data = data.artists || data.albums;
                var resultsHtml = '';
                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images[0]) {
                        resultsHtml += '<div class="searchResult"><a href="' +
                            data.items[i].external_urls.spotify +
                            '"><img src="' +
                            data.items[i].images[0].url +
                            '"><h4>' +
                            data.items[i].name +
                            '</h4></a></div>';
                    } else {
                        '<div class="searchResult"><a href="' +
                            data.items[i].external_urls.spotify +
                            '"><img src="https://vignette.wikia.nocookie.net/krewella/images/5/51/NoImage.png"><h4>' +
                            data.items[i].name +
                            '</h4></a></div>';
                    }
                }
                $('#results').append(resultsHtml);

                checkForNextItems(data);
            },
        });
    }
})();
