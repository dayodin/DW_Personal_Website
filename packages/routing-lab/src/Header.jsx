import { Link } from "react-router";

import "./Header.css";

export function Header(props) {

    const toggleDarkMode = () => {
        props.setIsDarkMode((prev) => !prev);
    };

    return (
        <header>
            <h1>My cool site</h1>
            <div>
                <label>
                    Header Dark Mode <input type="checkbox" checked={props.isDarkMode} onChange={toggleDarkMode} />
                </label>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/images">Image Gallery</Link>
                    <Link to="/account">Account</Link>
                </nav>
            </div>
        </header>
    );
}
