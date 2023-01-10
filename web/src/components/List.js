import { useState, useEffect, Fragment } from 'react';

import Header from './Header';
import RepoDetails from './RepoDetails';

function List() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commitUrl, setCommitUrl] = useState(null);
  const [fullName, setFullName] = useState(null);

  //****note to self - error handling */
  useEffect(() => {
    const dataFetch = async () => {
      const result = await (await fetch('http://localhost:4000/repos')).json();

      setItems(result);
      setFilteredItems(result);
      setLoading(true);
    };

    dataFetch();
  }, []);

  const showRepoDetails = (item) => {
    setCommitUrl(`${item.url}/commits`);
    setFullName(item.full_name);
    setShowModal(true);
  };

  if (!loading) {
    return <div>Loading...please wait</div>;
  } else {
    return (
      <Fragment>
        <Header
          filter={(language) =>
            setFilteredItems(items.filter((item) => item.language === language))
          }
          reset={() => setFilteredItems(items)}
        />
        <div>
          {filteredItems.length !== 0 ? (
            <ul>
              {filteredItems
                .sort((a, b) =>
                  b.created_at > a.created_at
                    ? 1
                    : b.created_at < a.created_at
                    ? -1
                    : 0
                )
                .map((item) => (
                  <li key={item.id} onClick={() => showRepoDetails(item)}>
                    <div>Repository name: {item.name}</div>
                    <div>Description: {item.description}</div>
                    <div>Language: {item.language}</div>
                    <div>Forks count: {item.forks_count}</div>
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
      </Fragment>
    );
  }
}

export default List;
