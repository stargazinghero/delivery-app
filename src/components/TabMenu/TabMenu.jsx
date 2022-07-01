import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useState, useEffect } from 'react';
import { TabPanel } from '../TabPanel/TabPanel';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemsState } from '../../redux/reducers/cart';
import { addToCart } from '../../redux/reducers/cart';
import Grid from '@mui/material/Grid';
import {
    getFirestore,
    getDocs,
    collection,
    where,
    query,
} from 'firebase/firestore';

import Notiflix from 'notiflix';

export const TabMenu = () => {
    const cartItems = useSelector(cartItemsState);
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const [restaurants, setRestaurants] = useState([]);
    const [meals, setMeals] = useState([]);
    const firestore = getFirestore();

    useEffect(() => {
        setMeals([]);
        const fetchData = async () => {
            const q = query(
                collection(firestore, 'meals'),
                where('idRest', '==', value),
            );
            await getDocs(q)
                .then(querySnapshot => {
                    if (querySnapshot.empty) {
                        Notiflix.Notify.failure('No matching request');
                        return;
                    }
                    querySnapshot.forEach(doc => {
                        if (doc.exists) {
                            const data = {
                                ...doc.data(),
                                id: doc.id,
                            };
                            setMeals(prev => [...prev, data]);
                        } else {
                            Notiflix.Notify.failure(
                                'List restaurants is empty',
                            );
                        }
                    });
                })
                .catch(error => {
                    Notiflix.Notify.failure(error.message);
                });
        };
        fetchData();
    }, [firestore, value]);
    useEffect(() => {
        const fetchData = async () => {
            await getDocs(collection(firestore, 'restaurants'))
                .then(querySnapshot => {
                    if (querySnapshot.empty) {
                        Notiflix.Notify.failure('No matching request');
                        return;
                    }
                    querySnapshot.forEach(doc => {
                        if (doc.exists) {
                            const data = {
                                ...doc.data(),
                                id: doc.id,
                            };
                            setRestaurants(prev => [...prev, data]);
                        } else {
                            Notiflix.Notify.failure(
                                'List restaurants is empty',
                            );
                        }
                    });
                })
                .catch(error => {
                    Notiflix.Notify.failure(error.message);
                });
        };
        fetchData();
    }, [firestore]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (cartItems.length === 0) {
            return;
        }
        setValue(cartItems[0]['idRest']);
    }, [cartItems]);

    function anyProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                minHeight: 300,
            }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    minWidth: '250px',
                }}
            >
                {restaurants.map(item => {
                    return (
                        <Tab
                            disabled={cartItems.some(
                                cartItem => cartItem.idRest !== Number(item.id),
                            )}
                            key={item.id}
                            label={item.name}
                            {...anyProps(item.id)}
                        />
                    );
                })}
            </Tabs>
            {restaurants.map(item => {
                return (
                    <TabPanel
                        key={item.id}
                        value={value}
                        index={Number(item.id)}
                    >
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            {meals.map(item => {
                                return (
                                    <Grid item xs={4} key={item.id}>
                                        <Card sx={{ maxWidth: 300 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="300"
                                                    image={item.img}
                                                    alt={item.name}
                                                />
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="div"
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        color="text.secondary"
                                                    >
                                                        Price:{item.price} $
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() =>
                                                        dispatch(
                                                            addToCart(item),
                                                        )
                                                    }
                                                >
                                                    Add to cart
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </TabPanel>
                );
            })}
        </Box>
    );
};
