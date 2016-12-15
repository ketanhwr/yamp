// lib.js

var config = require('../config.json')
var fs = require('fs')
var jsmediatags = require('jsmediatags')

var getPaths = function(callback) {
	var paths = []

	for(var i = 0; i < config.path.length;i++) {
		paths.push(config.path[i].loc)
	}

	if(callback) {
		callback(paths)
	}
	else {
		return paths
	}

}

var displaySongs = function()
{
	getPaths(function(paths) {

		paths.forEach(function(path, index) {

			fs.readdir(path, function(err, items) {
				
				if(items) {

					items.forEach(function(item, i2) {

						if(item.endsWith(".mp3"))
						{
							var loc = path + "/" + item
							getTags(loc, function(tag) {

								var imgsrc = getAlbumArt(tag)

								displaySongElement(getBasicTags(tag), loc, imgsrc)
							})
						}

					})
				}

			})
		})	
	})
}

var getTags = function(file, callback = null) {
	jsmediatags.read(file, {

		onSuccess: function(tag) {
			if(callback) {
				callback(tag)
			}
			else {
				return tag;
			}
		},

		onError: function(err) {
			console.log(err)
			return null;
		}
	})
}

var getTitle = function(tag) {
	return tag.tags.title
}

var getAlbum = function(tag) {
	return tag.tags.album
}

var getArtist = function(tag) {
	return tag.tags.artist
}

var getBasicTags = function(tag) {
	return {
		title: getTitle(tag),
		album: getAlbum(tag),
		artist: getArtist(tag)
	}
}

var getAlbumArt = function(tag) {
	var image = tag.tags.picture

	if (image) {

		var base64String = "";
		for (var i = 0; i < image.data.length; i++) {
			base64String += String.fromCharCode(image.data[i])
		}
		
		var base64 = "data:" + image.format + ";base64," + window.btoa(base64String)
		
		return base64
	}
	else {
		return null;
	}
}

var getAudioElement = function(src) {
	var audio = document.createElement("AUDIO")
	var source = document.createElement("SOURCE")

	source.setAttribute("src", src)
	source.setAttribute("type", "audio/mpeg")

	audio.appendChild(source)
	audio.setAttribute("controls", "")

	return audio
}

var getImageElement = function(src) {
	var image = document.createElement("IMG")
	image.setAttribute("src", src)
	image.setAttribute("class", "album-art")

	return image
}

var getHeadingElement = function(text) {
	var heading = document.createElement("H2")
	var t = document.createTextNode(text)

	heading.appendChild(t)

	return heading
}

var getLineBreakElement = function() {
	var linebreak = document.createElement("BR")

	return linebreak
}

var getDivElement = function() {
	var div = document.createElement("DIV")
	div.setAttribute("class", "songbutton")

	return div
}

var getButtonElement = function(loc, imgsrc, basicTags) {
	var button = document.createElement("BUTTON")

	if(!basicTags.title)
	{
		var i1 = loc.lastIndexOf(".mp3")
		var i2 = loc.lastIndexOf("/")

		basicTags.title = loc.substring(i2+1, i1);
	}

	button.setAttribute("data-src", loc)
	button.setAttribute("data-imgsrc", imgsrc)
	button.setAttribute("data-title", basicTags.title)
	button.setAttribute("data-artist", basicTags.artist)
	button.setAttribute("data-album", basicTags.album)

	var t = document.createTextNode(basicTags.title)
	button.appendChild(t)

	button.setAttribute("onclick", "buttonClick(this)")

	return button
}

var displaySongElement = function(basicTags, loc, imgsrc) {
	var div = getDivElement()

	div.appendChild(getButtonElement(loc, imgsrc, basicTags))

	document.getElementById('main').appendChild(div)
}

module.exports = {
	getPaths: getPaths,
	displaySongs: displaySongs,
	getTags: getTags,
	getTitle: getTitle,
	getAlbum: getAlbum,
	getArtist: getArtist,
	getBasicTags: getBasicTags,
	getAlbumArt: getAlbumArt,
	getAudioElement: getAudioElement,
	getImageElement: getImageElement,
	getHeadingElement: getHeadingElement,
	getLineBreakElement: getLineBreakElement,
	getDivElement: getDivElement,
	getButtonElement: getButtonElement,
	displaySongElement: displaySongElement
}