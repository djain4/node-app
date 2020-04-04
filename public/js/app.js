console.log("Something from here");

const errorEle = document.getElementById("error");
const successEle = document.getElementById("success");

// Fetch is part of browser api and not part of JS


const getForecast  = (address) => {

    errorEle.style.display = "none";
    successEle.innerHTML = "Loading...";
    successEle.style.display = "block";


    fetch('/weather?address=' + address).then((respose) => {
        respose.json().then((data) => {
            if(data.error) {
                // console.log("Error");
                successEle.style.display = "none";
                errorEle.innerHTML = "Could not find the location, please retry with valid inputs";
                errorEle.style.display = "block";
            }
            else {
                errorEle.style.display = "none";
                successEle.innerHTML = JSON.stringify(data);
                successEle.style.display = "block";
            }
        })
    })
}


const weatherForm = document.querySelector("form");
const searchEle = document.querySelector("input");



weatherForm.addEventListener("submit", (event) => {
    
    event.preventDefault();

    const location = searchEle.value;

    getForecast(location);
})