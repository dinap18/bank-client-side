import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {IconButton} from "@material-ui/core";
import bank from "../images/cryptocurrencies.png";
import transfer from "../images/money-transfer.png";
import salary from "../images/salary.png";
import loan from "../images/loan.png";
import historyy from "../images/history.png";
import exchange from "../images/exchange-rate.png"
import judge from "../images/judge.png"
import {useHistory} from "react-router-dom";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTransfer = () => {
        history.push('/transfer');
    }

    const handleLoan = () => {
        history.push('/loan');
    }
    const handleRequestLoan = () => {
        history.push('/requestLoan');
    }
    const handleHistory = () => {
        history.push('/accountactions');
    }
    const handleExchange = () => {
        history.push('/exchange-rates');
    }
    const handleApprove = () => {
        history.push('/approve-requests');
    }
    return (
        <div>
            <IconButton aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleClick}>
                <img src={bank} width="40" height="40" alt={"bank"}/>
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={handleTransfer}>
                    <ListItemIcon>
                        <img src={transfer} width="25" height="25"/>
                    </ListItemIcon>
                    <ListItemText primary="Transfer"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleLoan}>
                    <ListItemIcon>
                        <img src={salary} width="25" height="25"/>
                    </ListItemIcon>
                    <ListItemText primary="Loan"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleRequestLoan}>
                    <ListItemIcon>
                        <img src={loan} width="25" height="25"/>
                    </ListItemIcon>
                    <ListItemText primary="Request Loan"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleHistory}>
                    <ListItemIcon>
                        <img src={historyy} width="25" height="25"/>
                    </ListItemIcon>
                    <ListItemText primary="Account History"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleExchange}>
                    <ListItemIcon>
                        <img src={exchange} width="25" height="25"/>
                    </ListItemIcon>
                    <ListItemText primary="Exchange Rates"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={handleApprove}>
                    <ListItemIcon>
                        <img src={judge} width="25" height="25"/>
                    </ListItemIcon>
                    <ListItemText primary="Approve New Users"/>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}
