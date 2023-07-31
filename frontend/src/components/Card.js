import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ card: { link, name, likes, _id, owner }, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = owner === currentUser._id;
    const isLiked = likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = ( 
        `cards__like-button ${isLiked && 'cards__like-button_active'}` 
      );

    function handleClick() {
        onCardClick({ link, name });
    }

    function handleLikeClick() {
        onCardLike({_id, likes});
    }

    function handleCardDelete() {
        onCardDelete(_id);
    }

    return (
        <li className="cards__item" id={_id}>
            <article className="cards__article">
                <img className="cards__image" src={link} alt={name} onClick={handleClick} />
                <div className="cards__item-description">
                    <h2 className="cards__title">{name}</h2>
                    <div className="cards__likes-container">
                        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                        <p className="cards__likes-counter">{likes.length}</p>
                    </div>
                </div>
                {isOwn && <button className="cards__delete-button" type="button"onClick={handleCardDelete}/>}
            </article>
        </li>
    )
}