// Add an event to the window so as to add a class name (sticky)to the header
// which i later style in the CSS
window.addEventListener('scroll', () => {
    const header = document.querySelector('header')
    header.classList.toggle('sticky', window.scrollY > 0)
})


// Variable for my API_KEY
const apiKey = '-pbSLvOYlJWtEOKPuqX5WhG40iodVrVw5Yux3OOO_50'

// Getting form element from thE DOM
const form = document.querySelector('.search-input')

// Getting the container for the pictures named (GRID
const grid = document.querySelector('.grid')

// Getting the Input element
const input = document.querySelector('input')

// Variable for SHOW MORE button
const showMore = document.querySelector('.show-more')


// setting my pages to be four initially pages to be four by default
let page = 4

// Creatting an ASYNC and AWAIT function for the API (getData)
async function getData() {
// Making sure the URL variable is dynamic so that wee can manipulate the value and pages 
    const url = `https://api.unsplash.com/search/photos/?query=${input.value}&per_page=${page}&client_id=${apiKey}`
    const response = await fetch(url)
    
// Converting the reponse to JSON
    const data = await response.json();

// Creating a variable for the results (ITEMS) which is an array
    const items = data.results

// Making sure the grid innerHTML is empty before inserting the pictures

    if (items.length >= 1) {
        grid.innerHTML = '';
    }

    if(items.length === 0){
        grid.innerHTML = `<h1 class='error'>There is no image for ${input.value}</h1>`
        showMore.style.display = 'none'
    }

// Maping through the ITEMS array and crating a section for each of the images

    items.map((item) => {
        // grid.innerHTML += `<section>
        //        <img src='${item.urls.small}'
        //        alt='${item.alt_description}'/>
        //        <p>DESCRIPTION: ${item.description}</p>
        //     </section>`
        const section = document.createElement('section')
        const image = document.createElement('img')
        image.src = item.urls.small
        image.alt = item.alt_description
        const description = document.createElement('p')
        description.textContent = 'DESCRIPTION: '
        if(item.description === null){
            description.textContent += 'There is no description for this image' 
        }else {
            description.textContent += item.description
        }
        section.appendChild(image)
        section.appendChild(description)    
        grid.appendChild(section)
        })
        if (items.length === 30) {
            const end = document.createElement('h1')
            end.textContent = 'End of the page'
            end.className = 'end-text'
            grid.appendChild(end)
        }
    }


// Add an event listener to the form element and calling the (getData) function

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (page > 4) {
        page = 4
    }
    getData()
    showMore.style.display = 'block'
})

// Add an event listener to SHOW MORE button in order four more page
// to the initial page and call the function again

showMore.addEventListener('click', () => {
    page += 4
    getData()
   
})

