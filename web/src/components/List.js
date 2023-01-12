import { useState, useEffect } from 'react';

import Header from './Header';
import RepoDetails from './RepoDetails';

import classes from './List.module.css';

function List() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commitUrl, setCommitUrl] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const fetchResult = await fetch('http://localhost:4000/repos');

        const result = await fetchResult.json();

        const sortedResult = result.sort((a, b) =>
          b.created_at > a.created_at ? 1 : b.created_at < a.created_at ? -1 : 0
        );

        setItems(sortedResult);
        setFilteredItems(sortedResult);
        setLoading(true);
        setAvailableLanguages([
          ...new Set(sortedResult.map((item) => item.language)),
        ]);
      } catch (err) {
        console.log('there was an error:', err);
        setError(true);
      }
    };

    dataFetch();
  }, []);

  const showRepoDetails = (item) => {
    setCommitUrl(`${item.url}/commits`);
    setFullName(item.full_name);
    setShowModal(true);
  };

  if (error) {
    return <h2>An error occurred. Refresh page</h2>;
  }
  if (!loading) {
    return <h2>Loading...please wait</h2>;
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
              {filteredItems.map((item) => (
                <li key={item.id} className={classes.list}>
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
