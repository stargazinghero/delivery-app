import { useState } from 'react';
import { useFormik } from 'formik';

import { Button, TextField, Typography } from '@mui/material';
import 'firebase/auth';
import validationSchema from './validation';
import Notiflix from 'notiflix';

import PasswordField from '../PasswordField/PasswordField';
import Link from '../SignUp/SignUp.styled';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
    const auth = getAuth();

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password,
                );
            } catch (error) {
                Notiflix.Notify.failure(error.message);
            }
            resetForm();
        },
    });

    function handleClickShowPassword() {
        setShowPassword(prevState => {
            return !prevState;
        });
    }

    return (
        <>
            <Typography variant="h1" mt={5}>
                Login
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: '375px' }}>
                <TextField
                    disabled={formik.isSubmitting}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                />
                <PasswordField
                    label="Password"
                    id="password"
                    isSubmitting={formik.isSubmitting}
                    showPassword={showPassword}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    handleClickShowPassword={handleClickShowPassword}
                    formikToched={formik.touched.password}
                    formikErrors={formik.errors.password}
                />
                <Button
                    disabled={formik.isSubmitting}
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                        marginTop: '15px',
                    }}
                >
                    login
                </Button>
            </form>
            <Typography variant="body1" mt={5}>
                Don’t have an account?
            </Typography>
            <Link to="/register">Register</Link>
        </>
    );
};

export default SignIn;
