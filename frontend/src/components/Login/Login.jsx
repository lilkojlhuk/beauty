import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice'
import './Login.scss'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const router = useNavigate()
    const isAuth = useSelector(checkIsAuth)

    useEffect(() => {
        if (isAuth) router('/')
    }, [isAuth])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ email, password }))

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='login'>
            <div className='container'>
                <div className="login__content">
                    <h1 className='login__form-title'>Авторизація</h1>
                    <form className='login__form' onSubmit={e => e.preventDefault()}>
                        <input
                            type='text'
                            className='login__form-input'
                            placeholder='Логин...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            className='login__form-input'
                            placeholder='Пароль...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {status ? <h1 className='login__form-status'>{status}</h1> : '' }
                        <p className='login__form-text'>Немає облікового запису? <Link className='login__form-text btn' to={'/register'}>Зареєструватись</Link></p>
                        <div className='login__form-button'>
                            <button className='login__form-btn' type='submit' onClick={handleSubmit}>Увійти</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login