import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import 'firebase/auth';
import validationSchema from './validation';
import Notiflix from 'notiflix';
import PasswordField from '../PasswordField/PasswordField';
import Link from './SignUp.styled';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';

const SignUp = () => {
    const auth = getAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            fullName: '',
            phoneNumber: '',
            password: '',
            passwordRepeat: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (values.password !== values.passwordRepeat) {
                Notiflix.Notify.failure('Password do not match');
                return;
            }
            try {
                await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password,
                ).then(async function (res) {
                    if (!res.user) {
                        Notiflix.Notify.failure('User not found');
                        return;
                    }
                    await updateProfile(res.user, {
                        displayName: values.fullName,
                        photoURL: values.phoneNumber,
                    });
                    await res.user.reload();
                });
                Notiflix.Notify.success("🥗Don't live to eat, but eat to live");
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
    function handleClickShowPasswordRepeat() {
        setShowPasswordRepeat(prevState => {
            return !prevState;
        });
    }

    return (
        <>
            <Typography variant="h1" mt={5}>
                Register
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
                    sx={{
                        marginTop: '10px',
                    }}
                />
                <TextField
                    disabled={formik.isSubmitting}
                    fullWidth
                    id="fullName"
                    name="fullName"
                    label="Full name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.fullName &&
                        Boolean(formik.errors.fullName)
                    }
                    helperText={
                        formik.touched.fullName && formik.errors.fullName
                    }
                    sx={{
                        marginTop: '10px',
                    }}
                />
                <TextField
                    disabled={formik.isSubmitting}
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.phoneNumber &&
                        Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    sx={{
                        marginTop: '10px',
                    }}
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
                <PasswordField
                    label="Repeat password"
                    id="passwordRepeat"
                    isSubmitting={formik.isSubmitting}
                    showPassword={showPasswordRepeat}
                    value={formik.values.passwordRepeat}
                    onChange={formik.handleChange}
                    handleClickShowPassword={handleClickShowPasswordRepeat}
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
                    register
                </Button>
            </form>
            <Typography variant="body1" mt={5}>
                Already have account?
            </Typography>
            <Link to="/login">Login</Link>
        </>
    );
};

export default SignUp;
