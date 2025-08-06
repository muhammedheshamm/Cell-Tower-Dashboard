import './Header.scss'

function Header() {
  return (
     <header className="header">
      <div className="container">
        <h1 className="header__title">Cell Tower Dashboard</h1>
        <p className="header__subtitle">Monitor cell tower operations across all cities</p>
      </div>
    </header>
  )
}

export default Header