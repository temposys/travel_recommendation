const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');


function resetForm() {
    document.getElementById("searchInput").value = "";
    const resultDiv = document.getElementById('resultDiv');
    resultDiv.innerHTML = '';
}

btnClear.addEventListener('click', resetForm);


function fillResult(resultDiv, item) {
    resultDiv.innerHTML += `<div class="result_item"><img src="${item.imageUrl}" alt="${item.name}">`
    + `<h3>${item.name}</h3>`
    + `<p>${item.description}</p>`
    + `<button class="visit">Visit</button></div>`;
}

function searchTrip() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('resultDiv');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];
            for (let key of Object.keys(data)) {
                if (key.startsWith(input.toLowerCase())) {
                    results = data[key];
                }
            }

            if (results.length > 0) {
                for (let item of results) {
                    if (item.cities !== undefined){
                        for (let city of item.cities) {
                            fillResult(resultDiv, city);
                        }
                    } else {
                        fillResult(resultDiv, item);
                    }
                }
            } else {
                resultDiv.innerHTML = '<div class="result_item"><h3>No options found.</h3></div>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '<div class="result_item"><h3>An error occurred while fetching data.</h3></div>';
        });
}

btnSearch.addEventListener('click', searchTrip);
