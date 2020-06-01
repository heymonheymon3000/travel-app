import { handleHomeClickEvent, formValidation } from './js/home';
import { handleMyTripsClickEvent } from './js/myTrips';

import './styles/style.scss'

window.addEventListener("DOMContentLoaded", handleHomeClickEvent);
window.addEventListener("DOMContentLoaded", formValidation, false);

export {
    handleHomeClickEvent,
    handleMyTripsClickEvent
}