var play = false
var initialised = false

function buttonClick(el) {

	initialised = true
	
	$('source').attr('src', $(el).attr('data-src'))
	$('#title').text($(el).attr('data-title'))
	$('#artist').text($(el).attr('data-artist'))
	$('#album').text($(el).attr('data-album'))

	var imgsrc = $(el).attr('data-imgsrc')

	if(imgsrc == "null" || imgsrc.length <= 25) {
		imgsrc = "img/album_art.jpg"
	}

	$('.album-art').attr('src', imgsrc)
	$('.background').attr('src', imgsrc)

	var audio = $('audio')

	audio[0].pause()
	audio[0].load()

	play = false
	$('.controls').attr('src', 'img/play.png')
}

function playpause() {
	if(initialised) {
		if(play) {
			$('audio')[0].pause()
			$('.controls').attr('src', 'img/play.png')
		}
		else {
			$('audio')[0].play()
			$('.controls').attr('src', 'img/pause.png')
		}
		play = !play
	}
}