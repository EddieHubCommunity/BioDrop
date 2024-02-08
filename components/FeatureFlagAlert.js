import { useFlags, useFlagsmith } from "flagsmith/react";
import Alert from "@components/Alert";

export default function FeatureFlagAlert() {
    const flagsmith = useFlagsmith()
    const {alert} = useFlags(["alert"])
    const alertJSON = flagsmith.getValue("alert", {json:true, fallback:{}})
    if(alert.enabled && alertJSON?.message) {
        return <Alert {...alertJSON} />
    }
    return null
}
