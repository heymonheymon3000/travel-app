const PIXABAY_API_KEY ='16785955-d1d2050b006d185f7a65e1b05'
const DARK_SKY_API_KEY ='841a9888f38f0d5458c1f32b892d2d1b'
const DARK_SKY_URL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/"
const PIXABAY_API_URL = "https://pixabay.com/api/?key="+PIXABAY_API_KEY+"&q="
const GEONAMES_URL = 'http://api.geonames.org/searchJSON?q='
const USERNAME = 'heymonheymon'

const addTrip = async (data = {}) => {
    const res = await fetch('/api/addTrip', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(data)
    })

    if (res.ok) {
        return await res.json()
    } else {
        let error = new Error(res.statusText)
        error.res = res
        throw error
    }
}

const getAllTrips = async () => {    
    const res = await fetch('/api/allTrips');

    if (res.ok) {
        return await res.json()
    } else {
        let error = new Error(res.statusText)
        error.res = res
        throw error
    }
}

const removeTrip = async (id = '') => {
    const res = await fetch('/api/removeTrip/'+id, {
        method: "DELETE"
    })

    if (res.ok) {
        return
    } else {
        let error = new Error(res.statusText)
        error.res = res
        throw error
    }
}

const getLocation = async (city = '') => {    
    const res = await fetch(GEONAMES_URL + city + "&username=" + USERNAME + "&maxRows=1")

    if (res.ok) {
        return await res.json()
    } else {
        let error = new Error(res.statusText)
        error.res = res
        throw error
    }
}

const fetchTripData = async (data) => {
    let tripData = {}

    const departure = data.departure
    const arrival = data.arrival

    const departureWeather = await fetch(DARK_SKY_URL + DARK_SKY_API_KEY + "/" + departure.lat + "," + departure.lng + "," + (Date.parse(departure.date)/1000) + "?exclude=minutely,hourly,daily,flags")
    const departureView = await fetch(PIXABAY_API_URL + departure.city + "&image_type=photo&per_page=3")
    const arrivalWeather = await fetch(DARK_SKY_URL + DARK_SKY_API_KEY + "/" + arrival.lat + "," + arrival.lng + "," + (Date.parse(arrival.date)/1000) + "?exclude=minutely,hourly,daily,flags")
    const arrivalView =  await fetch(PIXABAY_API_URL + arrival.city + "&image_type=photo&per_page=3")

    return Promise.all([departureWeather.json(), departureView.json(), arrivalWeather.json(), arrivalView.json()])
    .then((results) => {

        // departure data
        _.merge(tripData, {departure : {
            city: departure.city,
            date: new Date(departure.date+" ").toDateString(),
            lat: departure.lat,
            lng: departure.lng,
            summary: results[0].currently.summary,
            icon:  results[0].currently.icon,
            temperature: results[0].currently.temperature,
            webformatURL: results[1].hits[0].webformatURL
        }})

        // arrival data
         _.merge(tripData, {arrival : {
            city: arrival.city,
            date: new Date(arrival.date+" ").toDateString(),
            lat: arrival.lat,
            lng: arrival.lng,
            summary: results[2].currently.summary,
            icon:  results[2].currently.icon,
            temperature: results[2].currently.temperature,
            webformatURL: results[3].hits[0].webformatURL
        }})

        return tripData
    })
}
    
export {
    removeTrip,
    addTrip,
    getAllTrips,
    getLocation,
    fetchTripData
} 