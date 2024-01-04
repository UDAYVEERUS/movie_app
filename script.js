let input = document.getElementById('inpt');
let container = document.getElementById('container');
input.addEventListener("input", () => {
    Debounce(fetchData, 500);
})

let timer;

const Debounce = (func, delay) => {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
}
const printData = () => {
    console.log(input.value);
}

let apikey = 'eab2f29a';

const fetchData = async () => {
    try {
        let res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${input.value}`)
        let data = await res.json()
        console.log(data);
        if (data.Response === "True") {
            appendData(data.Search);
        } else {
            container.innerText = "Too many result found";
        }
    }
    catch (err) {
        console.log(err);
    }
}

const createCard = (item) => {
    const { Poster, Title, Type, Year, imdbID } = item;
    const cadrHTML = `
    <div class="card">
    <img class="poster" src="${Poster}" alt="${Title} Poster">
    <h2>${Title}</h2>
    <p>Type : ${Type}</p>
    <p>Year : ${Year}</p>
    <p>IMDBID : ${imdbID}</p>
    </div>
    `;
    return cadrHTML;
}


const appendData = (data) => {
    container.innerHTML = "";
    data.forEach(item => { container.innerHTML += createCard(item) });
}