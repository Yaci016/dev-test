import { useState } from "react";
import "./styles/global.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import useFetch from "./hooks/useFetch";
import Search from "./components/flickerApp/Search";
import useToTopButton from "./hooks/useObserver";
import CardGallery from "./components/flickerApp/CardGallery";
function App() {
  // We set Local state useful for our gallery app
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState(
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2a33dd08ea58d2c86ccb995df5f1cf6b&tags=nature&format=json&extras=description&nojsoncallback=1&per_page=10&page="
  );
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  // We use custom hooks specifically made to handle a certain logic in the app
  const { loading, error, list } = useFetch(query, page, searchText, setPage);
  const { showButton, scrollToTop } = useToTopButton();

  // if theres an error with the app we Show an error message and stop rendring
  if (error) return <div>Error: Server Problem</div>;

  /*

Search Component : handles search bar functionality and search features in general 
*/

  return (
    <>
      <div className="App">
        <Header />
        <main>
          <Search setPage={setPage} setSearchText={setSearchText} />
          <CardGallery list={list} loading={loading} setPage={setPage} />
        </main>
        {showButton && (
          <button onClick={scrollToTop} className="back-to-top">
            &#8679;
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
