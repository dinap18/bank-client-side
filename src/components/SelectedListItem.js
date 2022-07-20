import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SelectedListItem() {
    const classes = useStyles();
    const history = useHistory()
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if (index === 2) {
            history.push('/account');
        }
        if (index === 3) {
            history.push('/chat');
        }
        if (index === 4) {
            history.push('/transfer');
        }
        if (index === 5) {
            history.push('/loan');
        }
        if (index === 6) {
            history.push('/accountactions');
        }
    };

    return (
        <div>
            <List style={{backgroundColor: 'transparent'}} component="nav" aria-label="secondary mailbox folder">
                <ListItem
                    button
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemText primary="View account details and balance"/>
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemText primary="Chat with admins"/>
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                >
                    <ListItemText primary="Transfer money"/>
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 5}
                    onClick={(event) => handleListItemClick(event, 5)}
                >
                    <ListItemText primary="Loan money"/>
                </ListItem>
                <ListItem
                    button
                    selected={selectedIndex === 6}
                    onClick={(event) => handleListItemClick(event, 6)}
                >
                    <ListItemText primary="View banking history"/>
                </ListItem>
            </List>
        </div>
    );
}
