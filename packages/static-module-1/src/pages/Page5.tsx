import { useLogger } from "wmfnext-shell";

export default function Page5() {
    const logger = useLogger();

    logger.debug("Rendering \"page5\" from module \"static-1\"");

    return (
        <main>
            <h1>Page 5</h1>
            <p>From static-1</p>
        </main>
    );
}
