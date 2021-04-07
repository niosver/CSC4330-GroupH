import React from 'react';
import { 
    AppBar,
    Toolbar,
    ListItem,
    IconButton,
    ListItemText,
    Avatar,
    Divider,
    List,
    Typography,
    Box
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    navbar: {
        background: "#222",
        position: "static"
    }
}));

export const NavBar: React.FC = () => {
    const classes = useStyles();
    return(
        <Box component="nav">
            <AppBar className={classes.navbar}>
                <Toolbar>
                    <Typography color="inherit">
                        Bike App
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>

    )
}