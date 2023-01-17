import { useRuntime } from "wmfnext-shell";

export interface TrackingService {
    track: (data: unknown) => void;
}

export const TrackingServiceKey = "tracking";

export function useTrackingService() {
    const runtime = useRuntime();

    return runtime.getService(TrackingServiceKey) as TrackingService;
}
