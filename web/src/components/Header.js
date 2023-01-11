const Header = ({ filter, reset, availableLanguages }) => {
  return (
    <>
      <h1>Filter items by language</h1>
      <div>
        {availableLanguages.map((language, index) => {
          return (
            <button key={index} onClick={() => filter(language)}>
              {language ? language : 'Not Specified'}
            </button>
          );
        })}
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
};

export default Header;
