import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormCart from '../FormCart/FormCart';
import OrderList from '../OrderList/OrderList';

export const Cart = () => {
    return (
        <Box mt={10}>
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={6}>
                        <FormCart />
                    </Grid>
                    <Grid item xs={6}>
                        <OrderList />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
