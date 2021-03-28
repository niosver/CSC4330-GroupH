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
import {
    ArrowBack,
    AssignmentInd,
    Home,
    Apps,
    ContactMail
} from "@material-ui/icons";

export const NavBar: React.FC = () => {
    return(
        <Box component="nav">
            <AppBar position="static" style={{background: "#222"}}>
                <Toolbar>
                    <Typography color="inherit">
                        Bike App
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>

    )
}