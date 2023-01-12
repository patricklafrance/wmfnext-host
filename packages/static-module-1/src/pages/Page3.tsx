import { useLogger } from "wmfnext-shell";

export default function Page3() {
    const logger = useLogger();

    logger.debug("Rendering \"page3\" from module \"static-1\"");

    return (
        <main>
            <h1>Page 3</h1>
            <p>From static-1</p>
        </main>
    );
}
