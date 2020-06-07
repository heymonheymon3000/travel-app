import _ from 'lodash'
import places from 'places.js'
import { addTrip, getLocation, fetchTripData }  from '../js/api'
import { hideSpinner, showSpinner}  from '../js/spinner'

const handleHomeClickEvent = (event) => {
    event.preventDefault()

    toggleActiveItem()

    let section = document.getElementById('main-content')
    section.innerHTML = buildLayout().innerHTML

    addEventListeners()
}

const addEventListeners = () => {
    // configure city type-ahead on form
    configurePlaces('inputFrom')
    configurePlaces('inputTo')

    // form validation event listener
    let inputs = document.getElementsByClassName("vcheck")
    Array.prototype.slice.call(inputs).map((input) => {
        input.addEventListener('change', (event) => {
            const inputFrom = document.getElementById('inputFrom').value
            const inputTo = document.getElementById('inputTo').value
            const inputDepartureDate = document.getElementById('inputDepartureDate').value
            const inputReturnDate = document.getElementById('inputReturnDate').value

            if (inputFrom == '' || inputTo == '' || inputDepartureDate == '' || inputReturnDate == '') {
                document.getElementById('submit').setAttribute('disabled', 'disabled')
            } else {
                document.getElementById('submit').removeAttribute('disabled')
            }
        })
    })

    // submit button event listener on form
    document.getElementById('submit').addEventListener('click', handleSubmitEvent)
}

const configurePlaces = (id) => {
    places({
        appId: 'plSJEHE4H2BS',
        apiKey: '52e9906ede72cff32993b1887418d161',
        container: document.getElementById(id),
        templates: {
            value: function(suggestion) {
                return suggestion.name;
            }
        }}).configure({
            type: 'city',
            aroundLatLngViaIP: false,
    })
}

const toggleActiveItem = () => { 
    document.getElementById('my-trips').classList.remove("active")
    document.getElementById('home').classList.add("active")
}

const buildLayout = () => {
    const fromDiv = createFormElementDiv()
    fromDiv.appendChild(createFormLabel('inputFrom', 'Departure City'))
    fromDiv.appendChild(createInput('inputFrom', 'text'))

    const toDiv = createFormElementDiv()
    toDiv.appendChild(createFormLabel('inputTo', 'Arrival City'))
    toDiv.appendChild(createInput('inputTo', 'text'))

    const departureDateDiv = createFormElementDiv() 
    departureDateDiv.appendChild(createFormLabel('inputDepartureDate', 'Departure Date'))
    departureDateDiv.appendChild(createInput('inputDepartureDate', 'date'))

    const returnDateDiv = createFormElementDiv() 
    returnDateDiv.appendChild(createFormLabel('inputReturnDate', 'Arrival Date'))
    returnDateDiv.appendChild(createInput('inputReturnDate', 'date'))

    const submitButtonDiv = createFormElementDiv() 
    submitButtonDiv.appendChild(createFormLabel('submitButton', 'Add Trip'))
    submitButtonDiv.appendChild(createSubmitButton())

    const rowDiv = document.createElement('div')
    rowDiv.classList.add('form-row')
    rowDiv.appendChild(fromDiv)
    rowDiv.appendChild(toDiv)
    rowDiv.appendChild(departureDateDiv)
    rowDiv.appendChild(returnDateDiv)
    rowDiv.appendChild(submitButtonDiv)

    const form = document.createElement('form')
    form.appendChild(rowDiv)

    const homeContentDiv = document.createElement('div')
    homeContentDiv.setAttribute('id', 'home-content')
    homeContentDiv.appendChild(form)
    homeContentDiv.appendChild(createSectionElement())

    // this is used as a container to store the html content
    const wrapper = document.createElement('div')
    wrapper.appendChild(homeContentDiv)

    return wrapper
}

const createFormLabel = (forAttribute, labelText) => {
    const label = document.createElement('label')
    label.setAttribute('for', forAttribute)
    label.innerHTML = labelText

    return label
}

const createInput = (id, type) => {
    const input = document.createElement('input')
    input.required = true
    input.setAttribute('id', id)
    input.classList.add('vcheck')
    input.classList.add('form-control')
    input.setAttribute('type', type)

    return input
}

const createFormElementDiv = () => {
    const div = document.createElement('div')
    div.classList.add('col-auto')
    div.classList.add('form-group')

    return div;
}

const createSectionElement = () => {
    const section = document.createElement('section')
    section.setAttribute('id', 'bg-image')
    return section
}

const createSubmitButton = () => {
    const button = document.createElement('button')
    button.setAttribute('type', 'submit')
    button.setAttribute('id', 'submit')
    button.setAttribute('disabled', 'disabled')
    button.classList.add('form-control')
    button.innerHTML = 'Submit'
    button.classList.add("btn")
    button.classList.add("mb-2")

    return button
}

const handleSubmitEvent = (event) => {
    

    event.preventDefault()

    const depCity = document.getElementById('inputFrom').value
    const arrCity = document.getElementById('inputTo').value
    const depDate = document.getElementById('inputDepartureDate').value
    const arrDate = document.getElementById('inputReturnDate').value

    if(Date.parse(depDate) > Date.parse(arrDate)) {
        document.getElementById('submit').setAttribute('disabled', 'disabled')
        document.getElementById('inputReturnDate').value = ''

        alert("Please enter in a Arrival Date that is later than the Departure Date.")
    } else {
        showSpinner()

        let tripInfo = {}

        getLocation(depCity)
        .then((location) => {
            if(location.geonames.length === 0) {
                document.getElementById('inputFrom').value = ''
                throw new Error("The Destination city " + depCity + " is not a valid city")
            }

            _.merge(tripInfo, {departure: { city: depCity, date: depDate, 
                lat: location.geonames[0].lat, lng: location.geonames[0].lng }})

            return getLocation(arrCity)
        })
        .then((location) => {
            if(location.geonames.length === 0) {
                document.getElementById('inputTo').value = '';
                throw new Error("The Arrival city " + arrCity + " is not a valid city")
            }

            _.merge(tripInfo, {arrival: {city: arrCity, date: arrDate, 
                lat: location.geonames[0].lat, lng: location.geonames[0].lng }})

            return fetchTripData(tripInfo)
        })
        .then((trip) => {
            return addTrip(trip)
        })
        .then((trip) => {
            document.getElementById('inputFrom').value = '';
            document.getElementById('inputTo').value = '';
            document.getElementById('inputDepartureDate').value = '';
            document.getElementById('inputReturnDate').value = '';    

            alert("Your trip to " + arrCity + " has been saved.")
        })
        .catch((err) => {
            alert(err.message)
        })
        .finally(() =>{
            hideSpinner()
        })
    }
}

export { handleHomeClickEvent }