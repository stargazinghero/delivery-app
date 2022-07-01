import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    color: white;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    &.active {
        color: rgb(255, 194, 68);
    }
    :hover,
    :focus {
        text-decoration: underline;
    }
`;

export const Quantity = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -7px;
    right: -12px;
    font-size: 12px;
    width: 20px;
    height: 20px;
    font-weight: 700;
    background-color: #fff;
    color: #00a082;
    border-radius: 50%;
`;
