import { Box, Container } from '@mui/material';
import { TabMenu } from '../TabMenu/TabMenu';

export const HomePage = () => {
    return (
        <Container maxWidth="xl">
            <Box mt={10}>
                <TabMenu />
            </Box>
        </Container>
    );
};
