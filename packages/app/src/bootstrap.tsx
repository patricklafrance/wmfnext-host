import { App } from "./App";
import { createRoot } from "react-dom/client";
import { registerDynamicRemotes } from "./temp";

interface RemoteDefinition {
    url: string;
    name: string;
}

const RemoteModulesRegistrationStatus = {
    inProgress: "in-progress",
    completed: "completed",
    failed: "failed"
};

const Remotes: RemoteDefinition[] = [
    {
        url: "http://localhost:8081",
        name: "remote1"
    }
];

// @ts-ignore
window.registrationState = RemoteModulesRegistrationStatus.inProgress;

registerDynamicRemotes(Remotes).then(errors => {
    if (errors.length > 0) {
        console.error("Errors occured during remotes registration: ", errors);
    }

    // @ts-ignore
    window.registrationState = RemoteModulesRegistrationStatus.completed;
});

//////////////// CODE OVER HERE IS TEMPORARY //////////////////

const root = createRoot(document.getElementById("root"));

root.render(
    <App />
);
