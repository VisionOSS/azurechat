import {
    Analytics,
    AnalyticsProp,
} from "@/features/analytics/analytics-ui/analytics";

export default async function Home(props: AnalyticsProp) {
    return <Analytics {...props} />;
}
