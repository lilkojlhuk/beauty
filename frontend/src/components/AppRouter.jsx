import { Route, Routes } from "react-router-dom"
import Error from './Error/Error'
import MainPage from "../pages/MainPage"
import PostsListPage from "../pages/PostsListPage"
import PostPage from "../pages/PostPage"
import EditPostPage from "../pages/EditPostPage"
import AddPostPage from "../pages/AddPostPage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/all" element={<PostsListPage />} />
            <Route path="all/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPostPage />} />
            <Route path="/remove/:id" element={<PostPage />} />
            <Route path="/add" element={<AddPostPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default AppRouter;