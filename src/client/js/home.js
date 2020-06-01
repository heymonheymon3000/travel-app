import places from 'places.js'

const handleHomeClickEvent = (event) => {
    event.preventDefault()

    toggleActiveItem();

    let section = document.getElementById('main-content')
    section.replaceWith(buildLayout());

    places({
        appId: 'plSJEHE4H2BS',
        apiKey: '52e9906ede72cff32993b1887418d161',
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
        appId: 'plSJEHE4H2BS',
        apiKey: '52e9906ede72cff32993b1887418d161',
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
    const homeContentDiv = document.createElement('div');
    homeContentDiv.setAttribute('id', 'home-content');

    const form = document.createElement('form-row');
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    const fromDiv = document.createElement('div');
    fromDiv.classList.add('col-auto');
    fromDiv.classList.add('form-group');
    const fromLabel = document.createElement('label');
    fromLabel.setAttribute('for', 'inputFrom');
    fromLabel.innerHTML = 'From Destination';
    const fromInput = document.createElement('input');
    fromInput.setAttribute('id', 'inputFrom');
    fromInput.classList.add('form-control');
    fromInput.setAttribute('type', 'text');
    fromInput.setAttribute('placeholder', 'From');

    const toDiv = document.createElement('div');
    toDiv.classList.add('col-auto');
    fromDiv.classList.add('form-group');
    const toLabel = document.createElement('label');
    toLabel.setAttribute('for', 'inputTo');
    toLabel.innerHTML = 'To Destination';
    const toInput = document.createElement('input');
    toInput.setAttribute('id', 'inputTo');
    toInput.classList.add('form-control');
    toInput.setAttribute('type', 'text');
    toInput.setAttribute('placeholder', 'To');

    const departureDateDiv = document.createElement('div');
    departureDateDiv.classList.add('col-auto');
    departureDateDiv.classList.add('form-group');
    const departureDateLabel = document.createElement('label');
    departureDateLabel.setAttribute('for', 'inputDepartureDate');
    departureDateLabel.innerHTML = 'Departure Date';
    const departureDateInput = document.createElement('input');
    departureDateInput.setAttribute('id', 'inputDepartureDate');
    departureDateInput.classList.add('form-control');
    departureDateInput.setAttribute('type', 'date');
    departureDateInput.setAttribute('placeholder', 'Departure date');

    const returnDateDiv = document.createElement('div');
    returnDateDiv.classList.add('col-auto');
    returnDateDiv.classList.add('form-group');
    const returnDateLabel = document.createElement('label');
    returnDateLabel.setAttribute('for', 'inputReturnDate');
    returnDateLabel.innerHTML = 'Departure Date';
    const returnDateInput = document.createElement('input');
    returnDateInput.setAttribute('id', 'inputReturnDate');
    returnDateInput.classList.add('form-control');
    returnDateInput.setAttribute('type', 'date');
    returnDateInput.setAttribute('placeholder', 'Return date');

    const submitButtonDiv = document.createElement('div');
    submitButtonDiv.classList.add('col-auto');
    submitButtonDiv.classList.add('form-group');
    const submitButtonLabel = document.createElement('label');
    submitButtonLabel.setAttribute('for', 'submitButton');
    submitButtonLabel.innerHTML = 'Add Trip';
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('id', 'submitButton');
    submitButton.classList.add('form-control');
    submitButton.innerHTML = 'Submit'
    submitButton.classList.add("btn");
    submitButton.classList.add("mb-2");

    const section = document.createElement('section');
    section.setAttribute('id', 'bg-image');

    fromDiv.appendChild(fromLabel);
    fromDiv.appendChild(fromInput);

    toDiv.appendChild(toLabel);
    toDiv.appendChild(toInput);
    
    departureDateDiv.appendChild(departureDateLabel);
    departureDateDiv.appendChild(departureDateInput);

    returnDateDiv.appendChild(returnDateLabel);
    returnDateDiv.appendChild(returnDateInput);

    submitButtonDiv.appendChild(submitButtonLabel);
    submitButtonDiv.appendChild(submitButton);

    rowDiv.appendChild(fromDiv);
    rowDiv.appendChild(toDiv);
    rowDiv.appendChild(departureDateDiv);
    rowDiv.appendChild(returnDateDiv);
    rowDiv.appendChild(submitButtonDiv);

    form.appendChild(rowDiv);

    homeContentDiv.appendChild(form);
    homeContentDiv.appendChild(section);

    return homeContentDiv;
}

export { handleHomeClickEvent }