var gifApp = {};

var gifURL = 'http://api.giphy.com/v1/gifs/search'

// Request from the API our data for gif
gifApp.getGifs = function(query) {
	$.ajax ({
		url: gifURL, 
		method:'GET',
		dataType: 'json',
		data: {
			q:query,
			api_key:'l41YlJui6BNd5jJTy'
		}
	})
		.then(function(gifResults) {
		var justGifs = gifResults.data;
		console.log(justGifs);
		var randomNum = Math.floor(Math.random() * 25);
		console.log(randomNum);
		var justGifs = gifResults.data[randomNum];
		console.log(justGifs);
		var $gifContainer = $('<div>').addClass('gif');
		var $gifImage = $('<img>').attr({
			src: justGifs.images.original.url,
			alt: 'requested gif'
		})
		$gifContainer.append($gifImage);
		$('#result__container').append($gifContainer);
	});

};

//clear result container (for new searches)
gifApp.clearGif = function(clear) {
	$('#result__container').empty();
}


//Request from the API our data for quotes(it generates a random quote)
gifApp.getQuotes = function(QuotesResponse) {
	$.ajax({
		url:'http://api.forismatic.com/api/1.0/?',
		method:'GET',
		dataType: 'jsonp',
		data: "method=getQuote&format=jsonp&lang=en&jsonp=?"
	})
		.then(function(quoteResults) {
			gifApp.displayQuote = (quoteResults.quoteText);
			console.log(gifApp.displayQuote);
			$quoteContain= $('<p>').text(gifApp.displayQuote);
			$('#result__container').append($quoteContain);
		})

}	
	
//allow user to search for Gif. Upon search, run getgifs, getquotes and empty result container

gifApp.searchForm = function(findGif) {
	$('form').on('submit', function(e) {
		e.preventDefault();
		console.log('form submitted')
		var searchGif = $('input[type=search]').val();
		console.log(searchGif);
		$('.startInfo').css({top:5})
		gifApp.getGifs(searchGif);
		gifApp.clearGif();
		gifApp.getQuotes();
	})
}

//apply proper functions to init

gifApp.init = function (){
	console.log('working');
	gifApp.searchForm();
	console.log('formWorks');
	gifApp.getGifs();
};



//run init function that will run all processes for the page

$(function() {
	gifApp.init();
});