import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";


function Register({ handleRegister }) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
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
        const { email, password } = formValue;
        handleRegister({ email, password })
    }

    return (
        <>
            <Header>
                <Link to="/sign-in" className="header__menu-item">Войти</Link>
            </Header>
            <main className="page__element login">
                <AuthForm title={'Регистрация'}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    formValue={formValue}
                    submitButtonText={'Зарегистрироваться'} />
                <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
            </main>
        </>
    )
}

export default Register;