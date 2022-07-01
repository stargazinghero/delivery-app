import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
} from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useState, useEffect } from 'react';
import { useAuth } from 'reactfire';
import { useNavigate } from 'react-router-dom';
import { Link, Quantity } from './PageHeader.styled';
import { useSelector } from 'react-redux';
import { quantityState } from '../../redux/reducers/cart';

import Notiflix from 'notiflix';

const PageHeader = () => {
    const quantity = useSelector(quantityState);
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const auth = useAuth();
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const getShortName = name => {
        return name
            .trim()
            .split(' ')
            .map(word => word[0])
            .join('');
    };

    useEffect(() => {
        if (!auth.currentUser.displayName) {
            return;
        }
        const userRef = getShortName(auth.currentUser.displayName);
        setUser(userRef);
    }, [auth.currentUser.displayName]);

    const handleClose = async () => {
        try {
            await auth.signOut();
            setAnchorEl(null);
            navigate('/');
        } catch (error) {
            Notiflix.Notify.failure(error.message);
        }
    };
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    onClick={() => navigate('/')}
                    size="large"
                    edge="start"
                    color="primary"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <FastfoodIcon color="secondary" />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Delivery App
                </Typography>
                <Box
                    sx={{
                        flexGrow: 12,
                    }}
                >
                    <Link to="/">Shop</Link>
                    <Link to="/cart">
                        Shopping Cart
                        {quantity ? <Quantity>{quantity}</Quantity> : ''}
                    </Link>
                </Box>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar>{user}</Avatar>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={handleClose}>Log out</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default PageHeader;
