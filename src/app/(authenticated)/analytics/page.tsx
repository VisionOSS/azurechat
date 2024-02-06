import {
    Analytics,
    AnalyticsProp,
} from "@/features/analytics-page/analytics-ui/analytics";

export default async function Home(props: AnalyticsProp) {
    return <Analytics {...props} />;
}
