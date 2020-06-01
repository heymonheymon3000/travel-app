const handleMyTripsClickEvent = (event) => {
    event.preventDefault()

    toggleActiveItem();
    
    let section = document.getElementById('home-content');
    section.replaceWith(buildLayout())
}

const toggleActiveItem = () => {
    document.getElementById('home').classList.remove("active");
    document.getElementById('my-trips').classList.add("active");
}

const buildLayout = () => {
    const myTripsContentDiv = document.createElement('div');
    myTripsContentDiv.setAttribute('id', 'main-content');
    myTripsContentDiv.innerHTML = 'MY TRIPS';

    return myTripsContentDiv;
}

export { handleMyTripsClickEvent }