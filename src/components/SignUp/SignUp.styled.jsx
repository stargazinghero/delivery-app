import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const Link = styled(NavLink)`
    text-decoration: none;
    margin-top: 5px;
    color: #00a082;
    :hover,
    :focus {
        color: #f50000;
        text-decoration: underline;
    }
`;

export default Link;
