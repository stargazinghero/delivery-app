import { useEffect, useState } from 'react';

import { useUser } from 'reactfire';
import { Routes, Route, Navigate } from 'react-router-dom';
import GuestView from '../../views/GuestView/GuestView';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import AuthView from '../../views/AuthView/AuthView';
import { HomePage } from '../HomePage/HomePage';
import { Cart } from '../Cart/Cart';

export const App = () => {
    const { data: user, firstValuePromise } = useUser();
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const isLogged = !!user;
    useEffect(() => {
        firstValuePromise.then(() => setIsUserLoaded(true));
    }, [firstValuePromise, setIsUserLoaded]);

    if (!isUserLoaded) {
        return null;
    }

    if (isLogged) {
        return (
            <AuthView>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/login"
                        element={<Navigate to="/" replace />}
                    />
                    <Route
                        path="/register"
                        element={<Navigate to="/" replace />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </AuthView>
        );
    }

    return (
        <GuestView>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="login" element={<SignIn />} />
                <Route path="register" element={<SignUp />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </GuestView>
    );
};
