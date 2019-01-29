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

const styles = theme => ({
    root : {
        margin: '2%',
        borderRadius: 5,
    },
    center : {
        textAlign: 'center',
    },
});

class DetailledLeague extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            league : {},
        };
    }

    componentDidMount() {
        API.getLeagueDetail(this.props.match.params.id)
            .then(league => this.setState({ league : league.data}));
    }

    displayCreatorMenu = () => {
        if( this.state.league.creator === localStorage.getItem('user')) {
            return (
                <div>
                    <p> Vous etes le créateur de cette ligue !</p>
                    <Button> Start Draft !</Button>
                </div>
            )
        }
    };

    createPlayerList = (classes) => {
        if ( this.state.league.user && this.state.league.user.length > 0 ) {
            return this.state.league.user.map((player, index) => (
                <ListItem color="primary" className={classes.listItem} key={index}>
                    <ListItemIcon>
                        <BookmarkIcon/>
                    </ListItemIcon>
                    <ListItemText primary={player}/>
                    <ListItemSecondaryAction>
                        <IconButton className={classes.button} aria-label="Profil"><AccountBoxIcon/></IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))
        }
    };

    render() {
        const {classes} = this.props;
        const creatorMenu = this.displayCreatorMenu();

        return (
            <div>
                <h3 className={classes.center}>League Detail</h3>
                <h3 className={classes.center}>{this.state.league.name}</h3>
                <List subheader={<ListSubheader>Players</ListSubheader>} className={classes.root} color="primary">
                    {this.createPlayerList(classes)}
                </List>
                {creatorMenu}
            </div>
        )
    }
}

export default withStyles(styles)(DetailledLeague);
