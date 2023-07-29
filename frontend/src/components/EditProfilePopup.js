import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title={"Редактировать профиль"}
            name={"edit-profile"}
            onClose={onClose}
            isOpen={isOpen}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}>
            <>
                <label className="popup__field">
                    <input id="input-username" className="popup__input popup__input_type_name" type="text" placeholder="Имя"
                        name="name" required minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange} />
                    <span id="input-username-error" className="popup__input-error"></span>
                </label>
                <label className="popup__field">
                    <input id="input-about" className="popup__input popup__input_type_about" type="text"
                        placeholder="О себе" name="about" required minLength="2" maxLength="200" value={description || ''} onChange={handleDescriptionChange} />
                    <span id="input-about-error" className="popup__input-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}