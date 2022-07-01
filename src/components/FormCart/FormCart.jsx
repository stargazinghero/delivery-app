import { useFormik } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import 'firebase/auth';
import validationSchema from './validation';
import Notiflix from 'notiflix';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { totalPriceState, cartItemsState } from '../../redux/reducers/cart';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import { clearCart } from '../../redux/reducers/cart';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FormCart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const totalPrice = useSelector(totalPriceState);
    const cartItems = useSelector(cartItemsState);
    const auth = getAuth();
    const firestore = getFirestore();
    const formik = useFormik({
        initialValues: {
            email: `${auth.currentUser.email}`,
            fullName: `${auth.currentUser.displayName}`,
            phoneNumber: `${auth.currentUser.photoURL}`,
            address: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await setDoc(doc(firestore, 'orders', v4()), {
                    fullName: values.fullName,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    address: values.address,
                    totalPrice,
                    items: cartItems,
                });
                dispatch(clearCart());
                Notiflix.Notify.success('Order is placed, we go to you!🍽️');
                navigate('/');
            } catch (error) {
                Notiflix.Notify.failure(error.message);
            }
            resetForm();
        },
    });

    return (
        <>
            <Typography variant="h4" textAlign={'center'}>
                Order information
            </Typography>
            <form
                onSubmit={formik.handleSubmit}
                style={{ width: '75%', margin: '0 auto' }}
            >
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
                <TextField
                    disabled={formik.isSubmitting}
                    fullWidth
                    id="address"
                    name="address"
                    label="Address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                    sx={{
                        marginTop: '10px',
                    }}
                />
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    mt={2}
                >
                    <Typography
                        variant="h4"
                        textAlign={'center'}
                        color={'primary'}
                    >
                        Total price:{totalPrice ? totalPrice : 0}$
                    </Typography>
                    <Button
                        disabled={formik.isSubmitting || cartItems.length === 0}
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default FormCart;
