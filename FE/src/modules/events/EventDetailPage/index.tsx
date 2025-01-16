import { useParams } from "react-router-dom";

const EventDetailPage = () => {
  const params = useParams();
  const { id } = params;
  return <div>this is event detail page {id}</div>;
};

export default EventDetailPage;
