import '../css/InitStream.css';
import {
  useLoaderData,
} from "react-router-dom";
import StreamWindow from '../components/StreamWindow';

export async function loader({ params }) {
  const data = await getStreamDataByUsername(params.username);
  return { data };
}

export default function StreamPage() {
  const { data } = useLoaderData();

  return (
    <div className='content-stream-data'>
        <p>{data.title}</p>
        <p>{data.activityType}</p>
        <p>{data.streamDescriptions}</p>
    </div>
  );
}