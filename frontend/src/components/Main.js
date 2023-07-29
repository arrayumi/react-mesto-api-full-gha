import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';
import Header from './Header.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, email, onLogOut }) {

    const currentUser = useContext(CurrentUserContext);

    const cardsList = cards.map(card =>
        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
    )

    return (
        <>
            <Header>
                <p className="header__menu-item">{email}</p>
                <Link to="/sign-in" className="header__menu-item header__menu-item_type_logout" onClick={onLogOut}>Выйти</Link>
            </Header>
            <main className="page__element content">
                <section className="profile" aria-label="Профиль">
                    <div className="profile__avatar" onClick={onEditAvatar} >
                        <img className="profile__avatar-image" src={currentUser.avatar} alt="Аватар." />
                    </div>
                    <div className="profile__info">
                        <div className="profile__name-container">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__button profile__button_type_edit" type="button" onClick={onEditProfile}></button>
                        </div>
                        <h2 className="profile__caption">{currentUser.about}</h2>
                    </div>
                    <button className="profile__button profile__button_type_add" type="button" onClick={onAddPlace}></button>
                </section>

                <section className="cards" aria-label="Фотографии">
                    <ul className="cards__list">

                        {cardsList}

                    </ul>
                </section>
            </main>
        </>
    )
}

export default Main;