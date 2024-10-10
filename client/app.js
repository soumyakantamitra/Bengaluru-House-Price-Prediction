function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function onClickEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = document.getElementById("uiBHK")
    var bath = document.getElementById("uiBathrooms")
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "https://soumyamitra.pythonanywhere.com/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: parseInt(bhk.value),
        bath: parseInt(bath.value),
        location: location.value
    }, function (data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh Rs.</h2>";

        if (!estPrice.classList.contains('show')) {
            estPrice.classList.add('show');
        }
        console.log(status);
        console.log(sqft.value)
        console.log(bhk.value)
        console.log(bath.value)
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = "https://soumyamitra.pythonanywhere.com/get_location_names";
    $.get(url, function (data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;
