import React from 'react';

function Header({children}) {
    return (
        <header className="page__element header">
            <div className="header__logo"></div>
            <nav className="header__menu-list">
                {children}
            </nav>

        </header>
    )
}

export default Header;