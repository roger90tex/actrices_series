// URL de la API para buscar personas (actrices)
const API_BASE_URL = "https://api.tvmaze.com/search/people?q=";

// Actrices que te gustan
const actressNames = [
    "Scarlett Johansson", 
    "Emma Watson", 
    "Angelina Jolie", 
    "Natalie Portman", 
    "Jennifer Lawrence", 
    "Gal Gadot", 
    "Anne Hathaway", 
    "Margot Robbie", 
    "Keira Knightley", 
    "Kristin Kreuk"
];

// Contenedor donde se mostrarán las actrices
const actressesContainer = document.querySelector('.content__actresses');

// Función para obtener datos de una actriz por su nombre
async function fetchActress(name) {
    try {
        const response = await axios.get(`${API_BASE_URL}${encodeURIComponent(name)}`);
        return response.data[0].person; // Devolvemos la primera coincidencia de la búsqueda
    } catch (error) {
        console.log("Error al obtener a las actrices", error);
        return null;
    }
}

// Función para mostrar todas las actrices en la página
async function displayActresses() {
    for (const name of actressNames) {
        const actress = await fetchActress(name);

        if (actress) {
            // Crear un div para cada actriz
            const actressItem = document.createElement('div');
            actressItem.classList.add('actresses__item');
            
            // Crear la imagen de la actriz
            const actressImage = document.createElement('img');
            actressImage.classList.add('actresses__image');
            actressImage.src = actress.image ? actress.image.medium : 'https://via.placeholder.com/250x350';
            actressImage.alt = actress.name;

            // Crear el nombre de la actriz
            const actressName = document.createElement('h3');
            actressName.classList.add('actresses__name');
            actressName.textContent = actress.name;

            // Añadir la imagen y el nombre al div de la actriz
            actressItem.appendChild(actressImage);
            actressItem.appendChild(actressName);

            // Añadir el div de actriz al contenedor principal
            actressesContainer.appendChild(actressItem);
        }
    }
}

// Llamar a la función para mostrar las actrices cuando la página cargue
window.addEventListener('DOMContentLoaded', displayActresses);
