import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <main>
            <h1>404</h1>
            <Link to="/">Go back</Link>
        </main>
    );
}
