import { useLogger } from "wmfnext-shell";

export function Page4() {
    const logger = useLogger();

    logger.debug("Rendering \"page4\" from module \"static-1\"");

    return (
        <main>
            <h1>Page 4</h1>
            <p>From static-1</p>
        </main>
    );
}
