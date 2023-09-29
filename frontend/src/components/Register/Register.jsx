import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/features/auth/authSlice'
import './Register.scss'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const { status } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleSubmit = () => {
        try {
            dispatch(registerUser({ email, password, first_name, last_name, phone }))
            setEmail('')
            setPassword('')
            setFirstName('')
            setLastName('')
            setPhone('')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='register'>
            <div className='container'>
                <div className="register__content">
                    <h1 className='register__form-title'>Реєстрація</h1>
                    <form className='register__form' onSubmit={e => e.preventDefault()}>
                        <input
                            type='text'
                            className='register__form-input'
                            placeholder='Логин...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            className='register__form-input'
                            placeholder='Пароль...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type='text'
                            className='register__form-input'
                            placeholder='Им`я...'
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type='text'
                            className='register__form-input'
                            placeholder='Прізвище...'
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type='text'
                            className='register__form-input'
                            placeholder='Номер телефону...'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {status ? <h1 className='register__form-status'>{status}</h1> : '' }
                        <p className='register__form-text'>Є аккаунт? <Link className='register__form-text btn' to={'/login'}>Увійти</Link></p>
                        <div className='register__form-button'>
                            <button className='register__form-btn' type='submit' onClick={handleSubmit}>Зареєструватись</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register