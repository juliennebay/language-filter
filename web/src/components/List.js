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
        {items.map((item, index) => (
          <h4 key={index}>{item.full_name}</h4>
        ))}
      </div>
    </Fragment>
  );
}

export default List;
