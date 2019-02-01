import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import API from '../utils/API';
import { Route, Link, Switch } from 'react-router-dom';

import CreateLeague from './CreateLeague';
import JoinLeague from './JoinLeague';
import ViewLeague from './ViewLeague';
import DetailledLeague from './DetailledLeague';
import UserProfil from './UserProfil';
import Draft from './Draft';
import Admin from './Admin';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDrawer: false,
        };
    }

    disconnect = event => {
        API.logout();
        window.location = "/";
    };

    toggleDrawer = open => () => {
        this.setState({
            showDrawer: open,
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <MenuList>
                    <Link to="/dashboard" style={{ textDecoration: 'none', display: 'block' }}>
                        <MenuItem>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </MenuItem>
                    </Link>
                    <Link to={`${this.props.match.url}/create`} style={{ textDecoration: 'none', display: 'block' }}>
                        <MenuItem>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary="Create A League" />
                        </MenuItem>
                    </Link>
                    <Link to={`${this.props.match.url}/join`} style={{ textDecoration: 'none', display: 'block' }}>
                        <MenuItem>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary="Join A League" />
                        </MenuItem>
                    </Link>
                    <Link to={`${this.props.match.url}/draft`} style={{ textDecoration: 'none', display: 'block' }}>
                        <MenuItem>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary="Weekly Draft" />
                        </MenuItem>
                    </Link>
                </MenuList>
            </div>
        );

        return (
            <div className={classes.root}>
                <Drawer open={this.state.showDrawer} onClose={this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} onClick={this.toggleDrawer(true)} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            DraftDesIdiots
                        </Typography>
                        <Button onClick={this.disconnect} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>

                <Switch>
                    <Route exact path={this.props.match.path} component={ViewLeague}/>
                    <Route path={`${this.props.match.path}/user/:id`} component={UserProfil}/>
                    <Route path={`${this.props.match.path}/create`} component={CreateLeague} />
                    <Route path={`${this.props.match.path}/draft`} component={Draft} />
                    <Route path={`${this.props.match.path}/admin`} component={Admin} />
                    <Route path={`${this.props.match.path}/join`} component={JoinLeague} />
                    <Route path={`${this.props.match.path}/:id`} component={DetailledLeague}/>
                </Switch>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
