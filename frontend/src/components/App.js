import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import Login from './Login.js';
import Register from './Register.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth.js';


function App() {
    const [cards, setCards] = useState([]);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isSucess, setIsSucess] = useState(true);

    useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getCards()
        ])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch(err => {
                console.log(err);
            });

    }, [navigate]);


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);;
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);;
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard({});
    }

    function handleLoginState() {
        setIsLoggedIn(true);
        auth.getContent()
            .then((data) => {
                setEmail(data.email);
            })
            .catch(err => console.log(err));
    }

    function handleLogout() {
        localStorage.removeItem('_id');
        setIsLoggedIn(false);
        setCurrentUser({});
    }

    function checkToken() {
        const token = localStorage.getItem('_id');
        if (token) {
            handleLoginState();
            navigate('/cards', { replace: true });
        }
    }

    function handleInfoMessage(result) {
        setIsSucess(result);
    }

    function handleInfoTooltipOpen() {
        setIsInfoTooltipOpen(true);
    }

    useEffect(() => {
        checkToken();
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(err));
    }

    function handleCardDelete(_id) {
        api.deleteItem(_id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== _id));
            })
            .catch(err => console.log(err));
    }

    function handleUpdateUser(userInfo) {
        api.setUserInfo(userInfo)
            .then((newInfo) => {
                setCurrentUser(newInfo);
            })
            .then(() => closeAllPopups())
            .catch(err => console.log(err));
    }

    function handleUpdateAvatar(avatar) {
        api.setUserAvatar(avatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar)
            })
            .then(() => closeAllPopups())
            .catch(err => console.log(err));
    }

    function handleAddPlaceSubmit(card) {
        api.addItem(card)
            .then((newCard) => { setCards([newCard, ...cards]) })
            .then(() => closeAllPopups())
            .catch(err => console.log(err));
    }

    function handleRegister({ email, password }) {
        auth.register({ email, password })
            .then((res) => {
                navigate('/sign-in', { replace: true });
                handleInfoTooltipOpen();
                handleInfoMessage(true);
            }
            )
            .catch((err) => {
                console.log(err);
                handleInfoTooltipOpen();
                handleInfoMessage(false);
            });
    }

    function handleLogin({ email, password }) {
        auth.authorize({ email, password })
            .then((data) => {
                if (data._id) {
                    localStorage.setItem('_id', data._id);
                    handleLoginState();
                    navigate('/cards', { replace: true });
                }
            }
            )
            .catch((err) => {
                console.log(err);
                handleInfoTooltipOpen();
                handleInfoMessage(false);
            });
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Routes>
                    <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
                    <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
                    <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
                    <Route path="/"
                        element={<ProtectedRoute
                            element={Main}
                            isLoggedIn={isLoggedIn}
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            email={email}
                            onLogOut={handleLogout} />}
                    />

                </Routes>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <PopupWithForm
                    title={"Вы уверены?"}
                    name={"confirmation"}
                    onClose={closeAllPopups}
                    buttonText={"Да"}>
                </PopupWithForm>

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSucess={isSucess} />

                <Footer />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
