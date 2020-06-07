const hideSpinner = () => {
    let spinner = document.getElementById('my-spinner')
    spinner.setAttribute("style", "display: none;")

}

const showSpinner = () => {
    let spinner = document.getElementById('my-spinner')
    spinner.removeAttribute("style")
}

export { hideSpinner,  showSpinner}