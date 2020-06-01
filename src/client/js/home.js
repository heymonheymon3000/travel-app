import places from 'places.js'

const APP_ID = 'plSJEHE4H2BS';
const API_KEY = '52e9906ede72cff32993b1887418d161';

const handleHomeClickEvent = (event) => {
    event.preventDefault()

    toggleActiveItem();

    let section = document.getElementById('main-content')
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
}

const toggleActiveItem = () => { 
    document.getElementById('my-trips').classList.remove("active");
    document.getElementById('home').classList.add("active");
}

const buildLayout = () => {
    const fromDiv = createFormElementDiv();
    fromDiv.appendChild(createFormLabel('inputFrom', 'From Destination'));
    fromDiv.appendChild(createInput('inputFrom', 'text', 'From'));

    const toDiv = createFormElementDiv(); 
    toDiv.appendChild(createFormLabel('inputTo', 'To Destination'));
    toDiv.appendChild(createInput('inputTo', 'text', 'To'));
    
    const departureDateDiv = createFormElementDiv(); 
    departureDateDiv.appendChild(createFormLabel('inputDepartureDate', 'Departure Date'));
    departureDateDiv.appendChild(createInput('inputDepartureDate', 'date', 'Departure date'));

    const returnDateDiv = createFormElementDiv(); 
    returnDateDiv.appendChild(createFormLabel('inputReturnDate', 'Return Date'));
    returnDateDiv.appendChild(createInput('inputReturnDate', 'date', 'Return date'));

    const submitButtonDiv = createFormElementDiv(); 
    submitButtonDiv.appendChild(createFormLabel('submitButton', 'Add Trip'));
    submitButtonDiv.appendChild(createSubmitButton());

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.appendChild(fromDiv);
    rowDiv.appendChild(toDiv);
    rowDiv.appendChild(departureDateDiv);
    rowDiv.appendChild(returnDateDiv);
    rowDiv.appendChild(submitButtonDiv);

    const form = document.createElement('form-row');
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

const createInput = (id, type, placeholder) => {
    const input = document.createElement('input');
    input.setAttribute('id', id);
    input.classList.add('form-control');
    input.setAttribute('type', type);
    input.setAttribute('placeholder', placeholder);

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
    button.setAttribute('type', 'submit');
    button.setAttribute('id', 'submitButton');
    button.classList.add('form-control');
    button.innerHTML = 'Submit'
    button.classList.add("btn");
    button.classList.add("mb-2");

    return button;
}

export { handleHomeClickEvent }