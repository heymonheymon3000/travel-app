import { getAllTrips, removeTrip }  from '../js/api'
import { hideSpinner, showSpinner}  from '../js/spinner'

const handleMyTripsClickEvent = (event) => {
    event.preventDefault()
    toggleActiveItem()
    initPage()
}

const initPage = () => {
    showSpinner()
    getAllTrips()
    .then((trips) => {
        let section = document.getElementById('main-content')
        section.innerHTML = buildLayout(trips).innerHTML
        addEventListeners(trips)
    })
    .catch((err) => {
        alert(err)
    })
    .finally(() => {
        hideSpinner()
    })
}

const addEventListeners = (trips) => {
    for(const trip of trips) {
        document.getElementById(trip.id).addEventListener('click', (event) => {
            showSpinner()
            removeTrip(trip.id)
            .then(() => {
                const parentElement = document.getElementById('card-container')
                const removeElement = document.getElementById('c-id-'+trip.id)
                parentElement.removeChild(removeElement)
            })
            .then(() => {
                // before showing alert give a little delay so that the element can be removed from the DOM
                setTimeout(() => {
                    alert("Your trip to " + trip.arrival.city + " has been deleted.")
                    initPage()
                }, 100);
            })
            .catch((err) => {
                alert(err)
            })
            .finally(() => {
                hideSpinner()
            })
        })
    }

    // go to the home page
    let addButtons = document.getElementsByClassName("add")
    Array.prototype.slice.call(addButtons).map((addButton) => {
        addButton.addEventListener('click', (event) => {
            document.getElementById("home-ref").click();
        })
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
    cardContainer.setAttribute('id', 'card-container')

    if(trips.length === 0) {
        const div = document.createElement('div')
        div.innerHTML = '<h2>Currently you do not any saved trips!!!</h2>'
        cardContainer.appendChild(div)
    }

    for (const trip of trips) {
        cardContainer.appendChild(createCard(trip))
    }
    
    const myTripsContentDiv = document.createElement('div')
    myTripsContentDiv.setAttribute('id', 'my-trips-content')
    myTripsContentDiv.appendChild(title)
    myTripsContentDiv.appendChild(cardContainer)

    // this is used as a container to store the html contents
    // later we will grab the innerHTML out of this container 
    // to populate the DOM
    const wrapper = document.createElement('div')
    wrapper.appendChild(myTripsContentDiv)
    return wrapper
}

const createCard = (trip) => {
    const id = trip.id
    const departure = trip.departure
    const arrival = trip.arrival

    const row1 = document.createElement('div')
    row1.classList.add('row')
    const col1_1 = document.createElement('div')
    col1_1.classList.add('col')
    col1_1.appendChild(createCardTitleCity(departure.city))
    const col1_2 = document.createElement('div')
    col1_2.classList.add('col')
    col1_2.appendChild(createCardTitleCity(arrival.city))
    row1.appendChild(col1_1)
    row1.appendChild(col1_2)

    const row2 = document.createElement('div')
    row2.classList.add('row')
    const col2_1 = document.createElement('div')
    col2_1.classList.add('col')
    col2_1.appendChild(createCardTitleDate(departure.date))
    const col2_2 = document.createElement('div')
    col2_2.classList.add('col')
    col2_2.appendChild(createCardTitleDate(arrival.date))
    row2.appendChild(col2_1)
    row2.appendChild(col2_2)
    
    const row3 = document.createElement('div')
    row3.classList.add('row')
    const col3_1 = document.createElement('div')
    col3_1.classList.add('col')
    col3_1.appendChild(createWeatherIcon(departure.icon, departure.temperature))
    const col3_2 = document.createElement('div')
    col3_2.classList.add('col')
    col3_2.appendChild(createWeatherIcon(arrival.icon, arrival.temperature))
    row3.appendChild(col3_1)
    row3.appendChild(col3_2)

    const row4 = document.createElement('div')
    row4.classList.add('row')
    const col4_1 = document.createElement('div')
    col4_1.classList.add('col')
    col4_1.appendChild(createWeatherSummary(departure.summary))
    const col4_2 = document.createElement('div')
    col4_2.classList.add('col')
    col4_2.appendChild(createWeatherSummary(arrival.summary))
    row4.appendChild(col4_1)
    row4.appendChild(col4_2)

    const img = document.createElement('img')
    img.classList.add("card-img-top")
    img.setAttribute("src", arrival.webformatURL)
    img.setAttribute("alt", "Card image cap")

    const cardBody = document.createElement('card-body')
    cardBody.appendChild(row1)
    cardBody.appendChild(row2)
    cardBody.appendChild(document.createElement('hr'))
    cardBody.appendChild(row4)
    cardBody.appendChild(row3)
    
    const article = document.createElement('article')
    article.classList.add("card")
    article.classList.add("m-2")    
    article.setAttribute('id', 'c-id-'+id)
    article.setAttribute("style", "width: 24rem;")

    const cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')
    cardHeader.innerHTML = 'My Trip to ' + arrival.city + ' for ' + getNumberOfDays(departure.date, arrival.date) + ' days'
    article.appendChild(cardHeader)
    article.appendChild(img)
    article.appendChild(cardBody)
    article.appendChild(createFooter(id))
    return article
}

const createCardTitleCity = (city) => {
    const cityElement = document.createElement('h5')
    cityElement.classList.add('card-title')
    cityElement.classList.add('mt-2')
    cityElement.classList.add('mb-0')
    cityElement.classList.add('text-center')
    cityElement.innerHTML = city
    return cityElement
}

const createCardTitleDate = (date) => {
    const dateElement = document.createElement('h6')
    dateElement.classList.add('card-subtitle')
    dateElement.classList.add('text-center')
    dateElement.classList.add('mt-0')
    dateElement.innerHTML = date
    return dateElement
}

const createWeatherIcon = (icon, temp) => {
    const col1 = document.createElement('div')
    col1.classList.add('col-sm')
    col1.classList.add(icon)
    col1.classList.add('icon-size')
    col1.classList.add('mx-auto')
    col1.classList.add('mt-0')
    col1.classList.add('mb-0')
    col1.classList.add('mr-0')
    col1.classList.add('text-center')

    const col2 = document.createElement('div')
    col2.classList.add('col-sm')
    col2.classList.add('mx-auto')
    col2.classList.add('text-center')
    col2.classList.add('temperature')
    col2.classList.add('mt-0')
    col2.classList.add('mb-0')
    col1.classList.add('ml-0')
    col2.innerHTML = parseInt(temp, 10)+'&#730;'

    const row = document.createElement('div')
    row.classList.add('row')
    row.classList.add('mx-auto')
    row.classList.add('text-center')
    row.classList.add('mt-0')
    row.classList.add('mb-0')
    row.classList.add('pr-0')
    row.classList.add('pl-0')
    row.appendChild(col1)
    row.appendChild(col2)
    return row
}

const createWeatherSummary = (summary) => {
    const summaryElement = document.createElement('div')
    summaryElement.classList.add('card-title')
    summaryElement.classList.add('text-center')
    summaryElement.classList.add('mx-auto')
    summaryElement.classList.add('mt-0')
    summaryElement.classList.add('mb-0')
    summaryElement.innerHTML = summary
    return summaryElement
}

const createAddButton = () => {
    const button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-lg')
    button.classList.add('btn-primary')
    button.classList.add('add')
    button.setAttribute('type', 'button')
    button.setAttribute('id', 'add-button')
    button.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i> Add Trip'
    button.classList.add("mb-2")
    return button
}

const createDeleteButton = (id) => {
    const button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-lg')
    button.classList.add('btn-danger')
    button.classList.add('delete')
    button.setAttribute('type', 'button')
    button.setAttribute('id', id)
    button.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i> Delete Trip'
    button.classList.add("mb-2")
    return button
}

const createFooter = (id) => {
    const col1 = document.createElement('div')
    col1.classList.add('col')
    col1.classList.add('text-center')
    col1.classList.add('mx-auto')
    col1.appendChild(createAddButton())

    const col2 = document.createElement('div') 
    col2.classList.add('col')
    col2.classList.add('text-center')
    col2.classList.add('mx-auto')
    col2.appendChild(createDeleteButton(id))
   
    const row = document.createElement('div')
    row.classList.add('row')
    row.classList.add('text-center')
    row.classList.add('mx-auto')
    row.appendChild(col1)
    row.appendChild(col2)
    const footer = document.createElement('div')
    footer.classList.add('card-footer')
    footer.appendChild(row)
    return footer
}

const getNumberOfDays = (departureDate, arrivalDate) => {
    return (new Date(arrivalDate).getTime() - new Date(departureDate).getTime()) / (1000 * 3600 * 24); 
}

export { handleMyTripsClickEvent }