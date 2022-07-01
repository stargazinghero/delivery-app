import { Box } from '@mui/material';
import PageHeader from '../../components/PageHeader/PageHeader';

const AuthView = ({ children }) => {
    return (
        <Box>
            <PageHeader />
            {children}
        </Box>
    );
};

export default AuthView;
