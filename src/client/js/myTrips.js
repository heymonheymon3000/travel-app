import { getAllTrips  }  from '../js/api'

const handleMyTripsClickEvent = (event) => {
    event.preventDefault()

    toggleActiveItem()
    
    getAllTrips()
    .then((trips) => {
        let section = document.getElementById('main-content')
        section.innerHTML = buildLayout(trips).innerHTML
    })
    .catch((err) => {
        alert(err)
    })
}

const toggleActiveItem = () => {
    document.getElementById('home').classList.remove("active")
    document.getElementById('my-trips').classList.add("active")
}

const buildLayout = (trips) => {
    const header1 = document.createElement('h1')
    header1.innerHTML = 'My Trips'

    const title = document.createElement('div')
    title.classList.add('title')
    title.appendChild(header1)

    const cardContainer = document.createElement('div')
    cardContainer.classList.add('card-container')

    for (const trip of trips) {
        cardContainer.appendChild(createCard(trip))
    }

    const myTripsContentDiv = document.createElement('div')
    myTripsContentDiv.setAttribute('id', 'my-trips-content')
    myTripsContentDiv.appendChild(title)
    myTripsContentDiv.appendChild(cardContainer)

    // this is used as a container to store the html content
    const wrapper = document.createElement('div')
    wrapper.appendChild(myTripsContentDiv)

    return wrapper
}

const createCard = (trip) => {
    const departure = trip.departure
    const arrival = trip.arrival

    const cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-title')
    cardTitle.innerHTML = 'This is the title'

    const cardText = document.createElement('p')
    cardText.classList.add('card-text')
    cardText.innerHTML = departure.city

    const img = document.createElement('img')
    img.classList.add("card-img-top")
    img.setAttribute("src", departure.webformatURL)
    img.setAttribute("alt", "Card image cap")

    const cardBody = document.createElement('card-body')
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)

    const article = document.createElement('article')
    article.classList.add("card")
    article.classList.add("m-2")
    article.setAttribute("style", "width: 24rem;")

    article.appendChild(img)
    article.appendChild(cardBody)

    return article
}

export { handleMyTripsClickEvent }