import './header.scss';
import logo from '../../images/TheMealLogo.png';
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header className="header padding">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <div className="header__links">
        <Link to="/" className="header__link">Home</Link>
        <Link to="/about" className="header__link">About</Link>
        <Link to="/contacts" className="header__link">Contacts</Link>
        <Link to="/favorite" className="header__link">Favorite meals</Link>
      </div>
    </header>
  );
}

export default Header;
