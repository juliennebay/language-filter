import { useState, useEffect } from 'react';

import Header from './Header';
import RepoDetails from './RepoDetails';

function List() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commitUrl, setCommitUrl] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);

  //****note to self - error handling */
  useEffect(() => {
    const dataFetch = async () => {
      const result = await (await fetch('http://localhost:4000/repos')).json();

      setItems(result);
      setFilteredItems(result);
      setLoading(true);
      setAvailableLanguages([...new Set(result.map((item) => item.language))]);
    };

    dataFetch();
  }, []);

  console.log(availableLanguages);

  const showRepoDetails = (item) => {
    setCommitUrl(`${item.url}/commits`);
    setFullName(item.full_name);
    setShowModal(true);
  };

  if (!loading) {
    return <div>Loading...please wait</div>;
  } else {
    return (
      <>
        <Header
          availableLanguages={availableLanguages}
          filter={(language) =>
            setFilteredItems(items.filter((item) => item.language === language))
          }
          reset={() => setFilteredItems(items)}
        />
        <div>
          {filteredItems.length !== 0 ? (
            <ul>
              {[...filteredItems]
                .sort((a, b) =>
                  b.created_at > a.created_at
                    ? 1
                    : b.created_at < a.created_at
                    ? -1
                    : 0
                )
                .map((item) => (
                  <li key={item.id}>
                    <div>Repository name: {item.name}</div>
                    <div>Description: {item.description}</div>
                    <div>Language: {item.language}</div>
                    <div>Forks count: {item.forks_count}</div>
                    <button onClick={() => showRepoDetails(item)}>
                      More Info
                    </button>
                  </li>
                ))}
            </ul>
          ) : (
            <div>No repo found under this language</div>
          )}
        </div>
        <RepoDetails
          commitUrl={commitUrl}
          fullName={fullName}
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        />
      </>
    );
  }
}

export default List;
