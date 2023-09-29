import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { checkIsAuth, checkRole, currentUser, getRoleUser, logout, userRole } from '../../redux/features/auth/authSlice'
import { useEffect } from 'react'
import './Header.scss'

const Header = () => {
    const isAuth = useSelector(checkIsAuth)
    const userRole = useSelector(checkRole)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }

    useEffect(() => {
        dispatch(getRoleUser())
    }, [])

    return (
        <header>
            <nav className='navbar'>
                <div className='container'>
                    <div className='navbar__wrap'>
                        <a href="/" className='menu__logo'>Beauty</a>
                        {isAuth
                            ?
                            userRole === "ADMIN"
                                ?
                                <ul className='menu__list'>
                                    <li className='menu__item'><NavLink to={'/all'} className='menu__item-link'>Усі записи</NavLink></li>
                                    <li className='menu__item'><NavLink to={'/login'} className='menu__item-btn' onClick={logoutHandler}>Вийти</NavLink></li>
                                </ul>
                                :
                                <ul className='menu__list'>
                                    <li className='menu__item'><NavLink to={'/all'} className='menu__item-link'>Мої записи</NavLink></li>
                                    <li className='menu__item'><NavLink to={'/add'} className='menu__item-link'>Додати запис</NavLink></li>
                                    <li className='menu__item'><NavLink to={'/login'} className='menu__item-btn' onClick={logoutHandler}>Вийти</NavLink></li>
                                </ul>
                            :
                            <ul className='menu__list'>
                                <li className='menu__item'><NavLink to={'/login'} className='menu__item-btn'>Войти</NavLink></li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;