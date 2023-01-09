import { useState, useEffect, Fragment } from 'react';

function List() {
  const [items, setItems] = useState([]);

  //****note to self - error handling */
  useEffect(() => {
    const dataFetch = async () => {
      const result = await (await fetch('http://localhost:4000/repos')).json();

      setItems(result);
    };

    dataFetch();
  }, []);

  return (
    <Fragment>
      <div>
        <ul>
          {items
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
      </div>
    </Fragment>
  );
}

export default List;
