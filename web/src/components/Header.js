const Header = ({ filter, reset }) => {
  return (
    <>
      <h1>Filter items by language</h1>
      <h3>*Click the items for more info</h3>
      <div>
        <button onClick={() => filter('CSS')}>CSS</button>
        <button onClick={() => filter('HTML')}>HTML</button>
        <button onClick={() => filter('Java')}>Java</button>
        <button onClick={() => filter('Objective-C')}>Objective-C</button>
        <button onClick={() => filter('PHP')}>PHP</button>
        <button onClick={() => filter('TypeScript')}>TypeScript</button>
        <button onClick={() => filter('null')}>Not specified</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
};

export default Header;
