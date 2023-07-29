function InfoTooltip({ isOpen, onClose, isSucess }) {
    return (
        <div className={`popup popup_type_reg-info ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <div className={`popup__reg-image ${isSucess ? "popup__reg-image_type_sucess" : "popup__reg-image_type_error"}`}></div>
                <h2 className="popup__reg-message">
                    {isSucess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
                <button className="popup__button popup__button_type_close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;