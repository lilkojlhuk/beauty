import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { currentUser } from './redux/features/auth/authSlice';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(currentUser())
    }, [])
    
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
