import places from 'places.js'

const APP_ID = 'plSJEHE4H2BS';
const API_KEY = '52e9906ede72cff32993b1887418d161';

const handleHomeClickEvent = (event) => {
    event.preventDefault();

    toggleActiveItem();

    let section = document.getElementById('main-content')
    section.replaceWith(buildLayout());

    // configure type ahead for from destination
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

    // configure type ahead for to destination
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

const closeAlertHandler = (event) => {
    event.preventDefault();

    const alert = document.getElementById('close-alert');
    alert.addEventListener('click', (event) => {
        const alert = document.getElementById('form-alert');
        alert.classList.remove('show');
        alert.classList.add('fade');
        alert.classList.add('collaspe');
    });
}

const formValidation = () => {
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

    const inputFrom = document.getElementById('inputFrom').value;
    const inputTo = document.getElementById('inputTo').value;
    const inputDepartureDate = Date.parse(document.getElementById('inputDepartureDate').value);
    const inputReturnDate = Date.parse(document.getElementById('inputReturnDate').value);

    if(inputDepartureDate > inputReturnDate) {
        const alert = document.getElementById('form-alert');
        alert.classList.remove('collaspe');
        alert.classList.add('show');
        alert.classList.add('fade');

        document.getElementById('submit').setAttribute('disabled', 'disabled');
        document.getElementById('inputReturnDate').value = '';

        setTimeout(() => {
            const alert = document.getElementById('form-alert');
            alert.classList.remove('show');
            alert.classList.add('fade');
            alert.classList.add('collaspe');
        }, 5000);
    } else {
        // TODO:
        // go ahead and make the rest call and clear values....
    }
}

export { handleHomeClickEvent, formValidation, closeAlertHandler }