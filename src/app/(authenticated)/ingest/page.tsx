import { Ingest, IngestProp } from "@/features/ingest-page/ingest-page";

export default async function Home(props: IngestProp) {
    return <Ingest {...props} />;
}
