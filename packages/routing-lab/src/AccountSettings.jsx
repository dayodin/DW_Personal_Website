import { MainLayout } from "./MainLayout.jsx";

export function AccountSettings(props) {

    const handleChange = (event) => {
        props.usernameChange(event.target.value)
    }

    return (
        <>
            <h2>Account settings</h2>
            <label>
                Username <input onChange={handleChange} />
            </label>
            <p><i>Changes are auto-saved.</i></p>
        </>
    );
}
