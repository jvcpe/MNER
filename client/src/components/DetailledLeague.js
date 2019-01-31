import React from 'react';

import API from "../utils/API";

import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/es/Button/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {Link} from "react-router-dom";

const styles = theme => ({
    root : {
        margin: '2%',
        backgroundColor: theme.palette.primary.main,
    },
    center : {
        textAlign: 'center',
    },
    listItem : {
        backgroundColor: theme.palette.primary.dark,
    }
});

class DetailledLeague extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            league : {},
            selectedUser : [],
        };
    }

    componentDidMount() {
        API.getLeagueDetail(this.props.match.params.id)
            .then(league => this.setState({ league : league.data}));
    }


    send = event => {
        if(this.state.league.selectedUser % 2) {
            return;
        }

        let _send = {
            'email': this.state.email,
            'pseudo': this.state.pseudo,
            'password': this.state.password
        };
        API.signup(_send).then(function(data){
            window.location = "/"
        },function(error){
            console.log(error);
            return;
        })
    };

    deleteUser = playerId => {
        API.deleteUserFromLeague(this.state.league._id, playerId)
            .then(function(data){
                let league = this.state.league;
                let stateCopy = Object.assign({}, league);
                let array = [...stateCopy.user];
                let index = array.indexOf(playerId);
                if (index !== -1) {
                    stateCopy.user.splice(index, 1);
                    this.setState({league: stateCopy});
                }
            },function(error){
                console.log(error);
                return;
            })
    };

    displayCreatorMenu = (classes) => {
        if( this.state.league.creator === localStorage.getItem('user')) {
            return (
                <div className={classes.center}>
                    <p> Vous etes le créateur de cette ligue !</p>
                    <List subheader={<ListSubheader>Select player to start drafting</ListSubheader>} className={classes.root} color="primary">
                        {this.state.league.user.map((player, index) => (
                            <ListItem className={classes.listItem} color="primary" key={index}>
                                <ListItemIcon>
                                    <BookmarkIcon/>
                                </ListItemIcon>
                                <ListItemText primary={player}/>
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => this.deleteUser(player)} disabled={player === localStorage.getItem('user')} className={classes.button} aria-label="Profil"><DeleteIcon/></IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <Button> Start Draft !</Button>
                </div>
            )
        }
    };

    createPlayerList = (classes) => {
        if ( this.state.league.user && this.state.league.user.length > 0 ) {
            return this.state.league.user.map((player, index) => (
                <ListItem className={classes.listItem} color="primary" key={index}>
                    <ListItemIcon>
                        <BookmarkIcon/>
                    </ListItemIcon>
                    <ListItemText primary={player}/>
                    <ListItemSecondaryAction>
                        <IconButton component={Link} to={`/dashboard/user/${player}`} className={classes.button} aria-label="Profil"><AccountBoxIcon/></IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))
        }
    };

    render() {
        const {classes} = this.props;
        const creatorMenu = this.displayCreatorMenu(classes);

        return (
            <div>
                <h3 className={classes.center}>League Detail</h3>
                <h2 className={classes.center}>{this.state.league.name}</h2>
                <h3 className={classes.center}>{this.state.league.state}</h3>
                <List subheader={<ListSubheader>Players</ListSubheader>} className={classes.root} color="primary">
                    {this.createPlayerList(classes)}
                </List>
                {creatorMenu}
            </div>
        )
    }
}

export default withStyles(styles)(DetailledLeague);
