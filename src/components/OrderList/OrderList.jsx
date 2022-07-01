import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux';
import {
    addItemQuantity,
    subtractItemQuantity,
    removeFromCart,
} from '../../redux/reducers/cart';
import { cartItemsState } from '../../redux/reducers/cart';

export default function OrderList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(cartItemsState);
    return (
        <>
            <Typography variant="h4">Order List</Typography>
            {cartItems.length > 0 ? (
                <List sx={{ width: '100%', bgcolor: 'primary', padding: '0' }}>
                    {cartItems.map(item => {
                        return (
                            <ListItem
                                alignItems="center"
                                key={item.id}
                                sx={{ borderBottom: '1px solid #00a082' }}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={item.img}
                                        sx={{ width: 50, height: 50 }}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="h5"
                                                color="primary"
                                            >
                                                Price:
                                            </Typography>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="h5"
                                                color="primary"
                                            >
                                                {item.price} $
                                            </Typography>
                                        </>
                                    }
                                />
                                <Box display={'flex'} alignItems={'center'}>
                                    <IconButton
                                        onClick={() =>
                                            dispatch(addItemQuantity(item))
                                        }
                                    >
                                        <AddIcon />
                                    </IconButton>
                                    <Typography
                                        width={'20px'}
                                        textAlign={'center'}
                                    >
                                        {item.quantity}
                                    </Typography>
                                    <IconButton
                                        onClick={() =>
                                            dispatch(subtractItemQuantity(item))
                                        }
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>
                                            dispatch(removeFromCart(item))
                                        }
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        );
                    })}
                </List>
            ) : (
                <Typography variant="h3" color="primary" textAlign={'center'}>
                    Order list is empty
                </Typography>
            )}
        </>
    );
}
