import { toHtmlElement } from "./toHtmlElement.mjs";

// Function to create the header
function createHeader() {

    const divWithStuff = toHtmlElement(`
            <Nav>
                <h1>Karsten Dinsmore</h1>
                <a href='./index.html'>Home</a>
                <a href='./hobbies.html'>Hobbies</a>
            </Nav>`)

    // Find the body and insert the header at the top
    document.getElementById("navigation").append(divWithStuff);

    // Highlight the active page
    highlightActivePage();
}

// Function to highlight the active page in the navbar
function highlightActivePage() {
    const links = document.querySelectorAll("header nav a");

    const currentURL = window.location.pathname.split("/").pop(); // Get current filename

    links.forEach(link => {
        if (link.getAttribute("href").slice(2) === currentURL) {
            link.classList.add("active"); // Add class to highlight active link
        }
    });
}

// Wait for the page to load before inserting the header
window.addEventListener("load", createHeader);