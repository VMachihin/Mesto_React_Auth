import mainLogo from '../images/logo/main_logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={mainLogo} alt="Логотип сайта с названием проекта" className="header__logo" />
    </header>
  );
}

export default Header;
