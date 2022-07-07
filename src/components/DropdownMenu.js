import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from "@material-ui/core";
import bank from "../images/cryptocurrencies.png";
import transfer from "../images/money-transfer.png";
import salary from "../images/salary.png";
import loan from "../images/loan.png";
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

    const handleTransfer = ()=>{
        history.push('/transfer');
    }

    const handleLoan = ()=>{
        history.push('/loan');
    }
    const handleRequestLoan = ()=>{
        history.push('/requestLoan');
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
                    <ListItemText primary="Transfer" />
                </StyledMenuItem>
                <StyledMenuItem onClick={handleLoan}>
                    <ListItemIcon>
                        <img src={salary} width="25" height="25"/>
                    </ListItemIcon>
                    <ListItemText primary="Loan" />
                </StyledMenuItem>
                <StyledMenuItem onClick={handleRequestLoan}>
                    <ListItemIcon>
                        <img src={loan} width="25" height="25"/>
                    </ListItemIcon>
                    <ListItemText primary="Request Loan" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}
