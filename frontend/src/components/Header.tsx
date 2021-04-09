import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DirectionsBikeTwoToneIcon from '@material-ui/icons/DirectionsBikeTwoTone';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
      flex: 1,
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
    button: {
        margin: 8
    }
  }));

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string, 
};

export default function Header(props: { sections: any; title: any; }) {
    const classes = useStyles();
    const { sections, title } = props;
  
    return (
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          <DirectionsBikeTwoToneIcon style = {{ fontSize: 30}} />
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {title}
          </Typography>
          <Button className={classes.button} variant="outlined" size="small">
            Sign in
          </Button>
          <Button className={classes.button} variant="outlined" size="small">
            Sign up
          </Button>
        </Toolbar>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {sections.map((section: { title: string | null | undefined; url: string | undefined; }) => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              className={classes.toolbarLink}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </React.Fragment>
    );
}
