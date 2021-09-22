import { SpinnerDotted } from "spinners-react";
import Card from "./Card";
import useLoader from "../../hooks/useLoader";

interface FlickerApiResponse {
  farm: number;
  server: number;
  owner: string;
  id: number;
  secret: string;
  title: string;
  description: { _content: string };
}
interface CardGalleryProps {
  list: FlickerApiResponse[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}
function CardGallery({ list, setPage, loading }: CardGalleryProps) {
  const { loader } = useLoader(setPage);

  return (
    <>
      {list.map((p: FlickerApiResponse, key: number) => {
        return (
          <Card
            key={key}
            id={key}
            imageSrc={
              "https://farm" +
              p.farm +
              ".staticflickr.com/" +
              p.server +
              "/" +
              p.id +
              "_" +
              p.secret +
              ".jpg"
            }
            linkToFlickPost={
              "https://www.flickr.com/photos/" + p.owner + "/" + p.id
            }
            title={p.title}
            description={p.description._content}
          />
        );
      })}
      <div ref={loader} />;
      {loading && (
        <>
          <br />
          <div className="loader">
            <SpinnerDotted enabled={true} />
          </div>
        </>
      )}
    </>
  );
}

export default CardGallery;
