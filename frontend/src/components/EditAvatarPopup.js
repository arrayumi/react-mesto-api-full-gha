import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
    const inputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    useEffect(() => {
        inputRef.current.value = ''
    }, [isOpen])

    return (
        <PopupWithForm
            title={"Обновить аватар"}
            name={"add-card"}
            onClose={onClose}
            isOpen={isOpen}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}>
            <>
                <label className="popup__field">
                    <input id="input-avatar-url" className="popup__input popup__input_type_url" type="url"
                        placeholder="Ссылка на картинку" name="avatar" required ref={inputRef} />
                    <span id="input-avatar-url-error" className="popup__input-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}