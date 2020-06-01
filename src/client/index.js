import { handleHomeClickEvent, formValidation, closeAlertHandler } from './js/home';
import { handleMyTripsClickEvent } from './js/myTrips';

import './styles/style.scss'

window.addEventListener("DOMContentLoaded", handleHomeClickEvent);
window.addEventListener("DOMContentLoaded", formValidation, false);
window.addEventListener("DOMContentLoaded", closeAlertHandler, false);

export {
    handleHomeClickEvent,
    handleMyTripsClickEvent
}