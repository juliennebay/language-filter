import { useState, useEffect, Fragment } from 'react';

import Header from './Header';

function List() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);

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
                  <li key={item.id}>
                    <div>Repository name: {item.name}</div>
                    <div>Description: {item.description}</div>
                    <div>Language: {item.language}</div>
                    <div>Forks count: {item.forks_count}</div>
                    <div>Creation date - remove later: {item.created_at}</div>
                  </li>
                ))}
            </ul>
          ) : (
            <div>No repo found under this language</div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default List;
