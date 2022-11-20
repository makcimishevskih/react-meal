import './header.scss';
import logo from '../../images/TheMealLogo.png';
import { NavLink } from "react-router-dom";

const Header = () => {

  return (
    <header className="header padding">
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>

      <div className="header__links">
        <NavLink activeclassname="active" to="/" className="header__link">Home</NavLink>
        <NavLink activeclassname="active" to="/randomizer" className="header__link">Randomizer</NavLink>
        <NavLink activeclassname="active" to="/favorite" className="header__link">Favorite meals</NavLink>
        <NavLink activeclassname="active" to="/about" className="header__link">About</NavLink>
      </div>
    </header>
  );
}

export default Header;
