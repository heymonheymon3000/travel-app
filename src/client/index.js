import { handleHomeClickEvent } from './js/home';
import { handleMyTripsClickEvent } from './js/myTrips';

import './styles/style.scss'

window.addEventListener("DOMContentLoaded", handleHomeClickEvent);

export {
    handleHomeClickEvent,
    handleMyTripsClickEvent
}