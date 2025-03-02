import { Header } from "./Header.jsx";
import { Outlet } from "react-router";

export function MainLayout(props) {

    return (
        <div>
            <Header isDarkMode={props.isDarkMode} setIsDarkMode={props.setIsDarkMode} />
            <div style={{padding: "0 2em"}}>
                <Outlet />
            </div>
        </div>
    );
}
