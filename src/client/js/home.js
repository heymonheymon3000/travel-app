import places from 'places.js';
import { addTrip, getLocation }  from '../js/api';

const APP_ID = 'plSJEHE4H2BS';
const API_KEY = '52e9906ede72cff32993b1887418d161';
const USERNAME = 'heymonheymon';
const GEONAMES_URL = 'http://api.geonames.org/searchJSON?q=';

const handleHomeClickEvent = (event) => {
    event.preventDefault();

    toggleActiveItem();

    let section = document.getElementById('main-content');
    section.replaceWith(buildLayout());

    places({
        appId: APP_ID,
        apiKey: API_KEY,
        container: document.getElementById('inputFrom'),
        templates: {
            value: function(suggestion) {
                return suggestion.name;
            }
        }}).configure({
            type: 'city',
            aroundLatLngViaIP: false,
    });

    places({
        appId: APP_ID,
        apiKey: API_KEY,
        container: document.getElementById('inputTo'),
        templates: {
            value: function(suggestion) {
                return suggestion.name;
            }
        }}).configure({
            type: 'city',
            aroundLatLngViaIP: false,
    });

    addFormValidationListener();
}

const addFormValidationListener = () => {
    let inputs = document.getElementsByClassName("vcheck");
    Array.prototype.slice.call(inputs).map((input) => {
        input.addEventListener('change', (event) => {
            const inputFrom = document.getElementById('inputFrom').value;
            const inputTo = document.getElementById('inputTo').value;
            const inputDepartureDate = document.getElementById('inputDepartureDate').value;
            const inputReturnDate = document.getElementById('inputReturnDate').value;

            if (inputFrom == '' || inputTo == '' || inputDepartureDate == '' || inputReturnDate == '') {
                document.getElementById('submit').setAttribute('disabled', 'disabled');
            } else {
                document.getElementById('submit').removeAttribute('disabled');
            }
        });
    });
}

const toggleActiveItem = () => { 
    document.getElementById('my-trips').classList.remove("active");
    document.getElementById('home').classList.add("active");
}

const buildLayout = () => {
    const fromDiv = createFormElementDiv();
    fromDiv.appendChild(createFormLabel('inputFrom', 'From Destination'));
    fromDiv.appendChild(createInput('inputFrom', 'text'));

    const toDiv = createFormElementDiv(); 
    toDiv.appendChild(createFormLabel('inputTo', 'To Destination'));
    toDiv.appendChild(createInput('inputTo', 'text'));

    const departureDateDiv = createFormElementDiv(); 
    departureDateDiv.appendChild(createFormLabel('inputDepartureDate', 'Departure Date'));
    departureDateDiv.appendChild(createInput('inputDepartureDate', 'date'));

    const returnDateDiv = createFormElementDiv(); 
    returnDateDiv.appendChild(createFormLabel('inputReturnDate', 'Return Date'));
    returnDateDiv.appendChild(createInput('inputReturnDate', 'date'));

    const submitButtonDiv = createFormElementDiv(); 
    submitButtonDiv.appendChild(createFormLabel('submitButton', 'Add Trip'));
    submitButtonDiv.appendChild(createSubmitButton());

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('form-row');
    rowDiv.appendChild(fromDiv);
    rowDiv.appendChild(toDiv);
    rowDiv.appendChild(departureDateDiv);
    rowDiv.appendChild(returnDateDiv);
    rowDiv.appendChild(submitButtonDiv);

    const form = document.createElement('form');
    form.appendChild(rowDiv);

    const homeContentDiv = document.createElement('div');
    homeContentDiv.setAttribute('id', 'home-content');
    homeContentDiv.appendChild(form);
    homeContentDiv.appendChild(createSectionElement());

    return homeContentDiv;
}

const createFormLabel = (forAttribute, labelText) => {
    const label = document.createElement('label');
    label.setAttribute('for', forAttribute);
    label.innerHTML = labelText;

    return label;
}

const createInput = (id, type) => {
    const input = document.createElement('input');
    input.required = true;
    input.setAttribute('id', id);
    input.classList.add('vcheck');
    input.classList.add('form-control');
    input.setAttribute('type', type);

    return input;
}

const createFormElementDiv = () => {
    const div = document.createElement('div');
    div.classList.add('col-auto');
    div.classList.add('form-group');

    return div;
}

const createSectionElement = () => {
    const section = document.createElement('section');
    section.setAttribute('id', 'bg-image');

    return section;
}

const createSubmitButton = () => {
    const button = document.createElement('button');
    button.addEventListener("click", handleSubmitEvent);
    button.setAttribute('type', 'submit');
    button.setAttribute('id', 'submit');
    button.setAttribute('disabled', 'disabled');
    button.classList.add('form-control');
    button.innerHTML = 'Submit'
    button.classList.add("btn");
    button.classList.add("mb-2");

    return button;
}

const handleSubmitEvent = (event) => {
    event.preventDefault();

    const depCity = document.getElementById('inputFrom').value;
    const arrCity = document.getElementById('inputTo').value;
    const depDateTimestamp = Date.parse(document.getElementById('inputDepartureDate').value)/1000;
    const arrDateTimestamp = Date.parse(document.getElementById('inputReturnDate').value)/1000;

    if(inputDepartureDate > inputReturnDate) {
        document.getElementById('submit').setAttribute('disabled', 'disabled');
        document.getElementById('inputReturnDate').value = '';

        alert("Please enter in a Return Date that is later than the Departure Date.");
    } else {
        let departCityLocation = {};
        let arriveCityLocation = {};

        getLocation(GEONAMES_URL + depCity + "&username=" + USERNAME + "&maxRows=1")
        .then((location) => {
            if(location.geonames.length === 0) {
                document.getElementById('inputFrom').value = '';
                throw new Error("The Destination city " + depCity + " is not a valid city");
            }
            departCityLocation = { lat: location.geonames[0].lat, lng: location.geonames[0].lng };
            return getLocation(GEONAMES_URL + arrCity + "&username=" + USERNAME + "&maxRows=1");
        })
        .then((location) => {
            if(location.geonames.length === 0) {
                document.getElementById('inputTo').value = '';
                throw new Error("The Arrival city " + arrCity + " is not a valid city");
            }
            arriveCityLocation = { lat: location.geonames[0].lat, lng: location.geonames[0].lng };
            return addTrip('/api/addTrip', { 
                departure: {
                    timestamp: depDateTimestamp,
                    city: depCity,
                    lat: departCityLocation.lat,
                    lng: departCityLocation.lng
                },
                arrival: {
                    timestamp: arrDateTimestamp,
                    city: arrCity,
                    lat: arriveCityLocation.lat,
                    lng: arriveCityLocation.lng
                }                    
            });
        })
        .then((trip) => {
            alert(JSON.stringify(trip, null, 2));

            // document.getElementById('inputFrom').value = '';
            // document.getElementById('inputTo').value = '';
            // document.getElementById('inputDepartureDate').value = '';
            // document.getElementById('inputReturnDate').value = '';

            // document.getElementById("my-trips-ref").click();
        })
        .catch((err) => {
            alert(err.message);
        });        
    }
}

export { handleHomeClickEvent }