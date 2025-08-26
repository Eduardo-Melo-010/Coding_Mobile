document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        return alert('Você precisa digitar uma cidade');
    }

    const apiKey = '44b748705ee037d734c26f0699a93707';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    console.log(json)
})

function showAlert (msg) {
    documento.querySelector('#alert').innerHTML = msg;
}