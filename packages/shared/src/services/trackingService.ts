import { useRuntime } from "wmfnext-shell";

export class TrackingService {
    track(data: unknown) {
        console.log("[tracking] Tracking the following data: ", data);
    }
}

export const TrackingServiceKey = "tracking";

export function useTrackingService() {
    const runtime = useRuntime();

    return runtime.getService(TrackingServiceKey) as TrackingService;
}
