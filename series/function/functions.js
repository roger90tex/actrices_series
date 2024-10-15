// url de la API de TVMAZE

const API_URL = "https://api.tvmaze.com/shows";

//Elemento del dom donde mostraremos los datos

const showsContainer = document.querySelector('.content__shows');

//Funcion para obtener los datos de la API

async function fetchShows() {
    try{
        //Hacemos la solicitud GET a la API
        const response = await axios.get(API_URL);
        const shows = response.data;

        //Llamamos a la funcion para mostrar los datos
        displayShows(shows);
    } catch (error){
        console.log("Error al obtener los datos de la API", error);
    }
}


// funcion para crear los elementos y mostrar los datos en la pagina

function displayShows(shows){
    shows.forEach (show => {
        //Crear un div para cada show
        const showItem = document.createElement('div');
        showItem.classList.add('shows__item');

        //Crear el titulo del show

        const showTitle =  document.createElement('h3');
        showTitle.classList.add('shows__title');
        showTitle.textContent = show.name;

        //Crear la imagen del show
        const showImage = document.createElement('img');
        showImage.classList.add('shows__image');
        showImage.src = show.image ? show.image.medium : 'https://via.placeholder.com/250x350';
        showImage.alt = show.name;

        //Crear la descripcion resumen del show

        const showDescription = document.createElement('p');
        showDescription.classList.add ('shows__description');
        showDescription.innerHTML = show.summary ? show.summary: 'No hay descripcion disponible';


        // Añadir el titulo, imagen y descripcion al contenedor del show
        showItem.appendChild(showTitle);
        showItem.appendChild(showImage);
        showItem.appendChild(showDescription);

        //Añadir el show al contenedor principal

        showsContainer.appendChild(showItem);
    });
}

// Llamar a la funcion para obtener los datos cuando la pagina carga

window.addEventListener('DOMContentLoaded', fetchShows);
