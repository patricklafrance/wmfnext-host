import { Link } from "react-router-dom";
import { sessionManager } from "../session";

export default function Logout() {
    sessionManager.clearSession();

    return (
        <main>
            <h1>Logged out</h1>
            <div>You are logged out from the application!</div>
            <Link to="/login">Log in again</Link>
        </main>
    );
}
