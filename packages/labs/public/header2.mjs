import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");

let style = 
`<style>
    nav {
        display: flex;
        align-items: center;
        background-color: #80cda0;
    }

    h1 {
        font-size: 2rem;
        margin-left: 0.6rem;
    }

    a {
        font-size: 1.2rem;
        color: #efefef;
        font-weight: bold;
        text-decoration: none;
        margin-left: 2rem;
    }
    a.active {
        font-weight: bold;
        text-decoration: underline;
        color: #efefef;
    }

    button {
        display: none;
        margin-right: 0.6rem;
    }

    @media screen and (max-width: 600px) {

        nav {
            flex-wrap: wrap;
        }
            
        .header-add-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        #links {
            display: none;
            margin-top: -1rem;
        }
        
        #links a {
            display: block;
            flex: 0 0 100%;
            margin: 0rem 0rem 0.6rem 0.6rem;
        }

        button {
            display: block;
            height: 2rem;
        }
    }
</style>`

let navHTML = 
`<Nav>
    <div class="header-add-btn">
        <h1>Karsten Dinsmore</h1>
        <label>
            <input type="checkbox" autocomplete="off" />
            Dark mode
        </label>
        <button id="menu-button">Menu</button>
    </div>
    <div id="links" >
        <a href='./index.html'>Home</a>
        <a href='./hobbies.html'>Hobbies</a>
    </div>
</Nav>`

TEMPLATE.innerHTML = `${style} ${navHTML}`;

class KDNavbar extends HTMLElement {
    connectedCallback() {
        const shadowRoot = attachShadow(this, TEMPLATE);

        const btn = shadowRoot.querySelector("button");

        btn.addEventListener("click", (e) => {
            var x = shadowRoot.getElementById("links");
            if (x.style.display === "none" || x.style.display === "") {
                x.style.display = "initial";
            } else {
                x.style.display = "none";
            }
        });

        const dark_mode = shadowRoot.querySelector("label");

        dark_mode.addEventListener("change", (e) => {
            var body = document.body;
            
            body.classList.toggle("dark-mode")

            console.log(body.classList)
        });

        // var html = document.documentElement;

        // html.addEventListener("click", (e) => {
        //     var x = shadowRoot.getElementById("links");
        //     var w = window.innerWidth;

        //     console.log(e.target);
        //     console.log(x.style.display);
        //     console.log(w);

        //     if (x.style.display === "initial" && w < 600 && e.target != kd_navbar) {
        //         x.style.display = "none";
        //     }
        // })
    }
}



customElements.define("kd-navbar", KDNavbar);