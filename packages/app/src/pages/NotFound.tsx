import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main>
            <h1>404</h1>
            <Link to="/">Go back</Link>
        </main>
    );
}
