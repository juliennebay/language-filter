import classes from './Header.module.css';

const Header = ({ filter, reset, availableLanguages }) => {
  return (
    <>
      <h1>Filter items by language</h1>
      <div className={classes['buttons-list']}>
        {availableLanguages.map((language, index) => {
          return (
            <button
              className={classes.button}
              key={index}
              onClick={() => filter(language)}
            >
              {language ? language : 'Not Specified'}
            </button>
          );
        })}
        <button className={classes.button} onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
};

export default Header;
