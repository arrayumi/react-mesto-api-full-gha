import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ onClose, isOpen, onAddPlace }) {

    const [formValue, setFormValue] = useState({
        name: '',
        link: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: formValue.name,
            link: formValue.link,
        });
    }

    useEffect(() => {
        setFormValue({
            name: '',
            link: ''
        })
    }, [isOpen])

    return (
        <PopupWithForm
            title={"Новое место"}
            name={"add-card"}
            onClose={onClose}
            isOpen={isOpen}
            buttonText={"Создать"}
            onSubmit={handleSubmit}>
            <>
                <label className="popup__field">
                    <input id="input-name" className="popup__input popup__input_type_name" type="text"
                        placeholder="Название" name="name" required minLength="2" maxLength="30" value={formValue.name} onChange={handleChange} />
                    <span id="input-name-error" className="popup__input-error"></span>
                </label>
                <label className="popup__field">
                    <input id="input-url" className="popup__input popup__input_type_url" type="url"
                        placeholder="Ссылка на картинку" name="link" required value={formValue.link} onChange={handleChange} />
                    <span id="input-url-error" className="popup__input-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}