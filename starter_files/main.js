let displayOfArtists = document.querySelector('.search-info')
let audioPlayer = document.querySelector('.music-player')
let searchBar = document.querySelector('.search-bar')
let audioSource = document.querySelector('audio')

let input = document.querySelector('input')
let button = document.querySelector('button')
let form = document.querySelector('form')
let search = input.value
let url = 'https://itunes.apple.com/search?term='
input.autofocus = 'on'

// Favorite Query
let favoriteQuery = []
let favoriteList = document.querySelector('.player')
let favoriteButton = document.createElement('button')
favoriteButton.textContent = 'Favorite List'
favoriteButton.setAttribute('class', 'favoriteList')
favoriteList.appendChild(favoriteButton)

const processArtists = artists => {
  displayOfArtists.innerHTML = ''
  artists.forEach(function(artistData, index) {

    const gallery = document.createElement('li')
    const artistsLink = document.createElement('a')
    const artistsImg = document.createElement('img')
    const artistAndTrack = document.createElement('div')
    const artistsTitle = document.createElement('span')
    const trackName = document.createElement('span')
    // Replacing pic URL's px size and pulling Pics
    artistsImg.src = artistData.artworkUrl100
    // Pulling aritist name
    artistsTitle.textContent = artistData.artistName


    //Media Player Functionality
    artistsLink.addEventListener('click', event => {
      audioSource.setAttribute('src', artistData.previewUrl)
      audioSource.play()
    })

    // Favorite Button
    const isFavorited = favoriteQuery.find(data => data.previewUrl === artistData.previewUrl)

    const faveButton = document.createElement('button')
    if (isFavorited) {
      faveButton.textContent = 'Unfavorite'

      // Unfavorite Button function
      faveButton.addEventListener('click', event => {
        event.stopPropagation()
        favoriteQuery = favoriteQuery.filter(song => {
          return song.trackId != artistData.trackId
        })
        showFavorites(event)
      })
    } else {
      faveButton.textContent = 'Favorite'
      // Favorite Button Storage
      faveButton.addEventListener('click', event => {
        event.stopPropagation()
        favoriteQuery.push(artistData)
        // console.log(favoriteQuery)
      })
    }
    // Appending Things to page
    displayOfArtists.appendChild(gallery)
    gallery.appendChild(artistsLink)
    artistsLink.appendChild(artistsImg)
    artistsImg.setAttribute('alt', artistData.trackName)
    artistsLink.appendChild(artistAndTrack)
    artistAndTrack.appendChild(artistsTitle)
    artistAndTrack.appendChild(trackName)
    artistAndTrack.appendChild(faveButton)
  })
}

let searchInput = query => {
  // Completing the search
  let searchUrl = url + query + '&limit=20'

  fetch(searchUrl).then(response => response.json()).then(data => processArtists(data.results))
}

function showFavorites(event) {
  processArtists(favoriteQuery)
  event.preventDefault()
}

favoriteButton.addEventListener('click', event => {
  showFavorites(event)
})

form.addEventListener('submit', event => {
  event.stopPropagation()
  event.preventDefault()
  searchInput(search)
})

input.addEventListener('keyup', event => {
  searchInput(input.value)
})
