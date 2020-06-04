const handleMyTripsClickEvent = (event) => {
    event.preventDefault()

    toggleActiveItem()
    
    let section = document.getElementById('main-content')
    section.innerHTML = buildLayout().innerHTML
}

const toggleActiveItem = () => {
    document.getElementById('home').classList.remove("active")
    document.getElementById('my-trips').classList.add("active")
}

const buildLayout = () => {
    const myTripsContentDiv = document.createElement('div')
    myTripsContentDiv.setAttribute('id', 'my-trips-content')


    const title = document.createElement('div')
    title.classList.add('title')

    const header1 = document.createElement('h1')
    header1.innerHTML = 'My Trips'

    title.appendChild(header1)


    myTripsContentDiv.appendChild(title)

    // this is used as a container to store the html content
    const wrapper = document.createElement('div')
    wrapper.appendChild(myTripsContentDiv)

    return wrapper
}

export { handleMyTripsClickEvent }