import { useLogger } from "wmfnext-shell";

export default function Page2() {
    const logger = useLogger();

    logger.debug("Rendering \"page2\" from module \"static-1\"");

    return (
        <main>
            <h1>Page 2</h1>
            <p>From static-1</p>
        </main>
    );
}
