import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Login({ handleLogin }) {

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
        handleLogin({ email, password });
    }


    return (
        <>
            <Header>
                <Link to="/sign-up" className="header__menu-item">Регистрация</Link>
            </Header>
            <main className="page__element login">
                <AuthForm
                    title={'Вход'}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    formValue={formValue}
                    submitButtonText={'Войти'} />
            </main>
        </>
    )
}

export default Login;