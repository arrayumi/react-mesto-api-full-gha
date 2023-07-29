import useFormAndValidation from "../hooks/useFormAndValidation"

export default function AuthForm({ title, handleSubmit, handleChange, formValue, submitButtonText }) {

    const { values, handleChanges, errors, isValid, setValues, resetForm } = useFormAndValidation();

    return (
        <>
            <h1 className="login__title">{title}</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__field">
                    <input className="login__input" type="email" placeholder="Email"
                        name="email" required value={formValue.email} onChange={handleChange} />
                </label>
                <label className="login__field">
                    <input className="login__input" type="password"
                        placeholder="Пароль" name="password" required value={formValue.password} onChange={handleChange} />
                </label>
                <button className="login__button" type="submit">{submitButtonText}</button>
            </form>
        </>
    )
}