import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import API from "../utils/API";
import constants from "../constants";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({});

class Draft extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerChoiceInProgress : false,
            draftId : '',
            draftState : '',
            draftedFormation : {},
            currentFormation : [{}],
            draftedPlayer : [],
            currentDraw: []
        };
    }

    componentDidMount() {
        API.getDraftState(localStorage.getItem('user')).then(data => {
            console.log(data.data);
            this.setState({
                draftId : data.data.id,
                draftState : data.data.state,
                draftedFormation : data.data.draftedFormation,
                currentFormation : data.data.currentFormation,
                draftedPlayer : data.data.draftedPlayer,
                currentDraw : data.data.currentDraw,
            });
            if(this.state.currentDraw.length !== 0) {
                this.setState({playerChoiceInProgress : true});
            }
        });
    }

    startDraft = () => {
        API.startDraft(this.state.draftId).then(data => {
            console.log("[Draft] Draft started succesfully !");
            console.log(data);
            this.setState({draftState : 'in_progress', currentFormation : data.data.data});
        },error => {
            console.log(`[Draft] Draft did not started succesfully ! Error : ${error}`);
            return;
        })
    };

    selectFormation(formation) {
        const _send = {
            draftId : this.state.draftId,
            formationId : formation._id,
        };
        API.selectFormation(_send).then(data => {
            console.log("[Draft] Formation chose successfully !");
            console.log(data);
            this.setState({draftedFormation : formation, currentFormation : []});
        },error => {
            console.log(`[Draft] Formation wasn't chose successfully ! Error : ${error}`);
            return;
        })
    }

    selectPlayer(player) {
        const _send = {
            draftId : this.state.draftId,
            playerId : player._id,
        };
        API.selectPlayer(_send).then(data => {
            console.log("[Draft] Formation chose successfully !");
            console.log(data);
            if(this.state.draftedPlayer.length + 1 === constants.NUMBER_OF_DRAFTED_PLAYER) {
                this.setState({draftedPlayer : [...this.state.draftedPlayer, player], currentDraw : [], draftState : 'done'});
            }else{
                this.setState({draftedPlayer : [...this.state.draftedPlayer, player], currentDraw : []});
            }
            this.handleClose();
        },error => {
            console.log(`[Draft] Formation wasn't chose successfully ! Error : ${error}`);
            return;
        })
    }

    drawPlayer(position) {
        const _send = {
            draftId : this.state.draftId,
            position,
        };
        API.drawPlayer(_send).then(data => {
            console.log("[Draft] Player chose successfully !");
            console.log(data);
            this.setState({currentDraw : data.data.data, playerChoiceInProgress : true});
        },error => {
            console.log(`[Draft] Player wasn't chose successfully ! Error : ${error}`);
            return;
        })
    };

    handleClose = () => {
        this.setState({ playerChoiceInProgress: false });
    };

    nextDraw = event => {
        API.getNextDraw().then(function(data){
            console.log("success");
        },function(error){
            console.log(error);
            return;
        })
    };

    render() {
        const {classes} = this.props;

        let MediaCard = player => (
            <Card style={{height: "300px", width: "200px"}}>
                <img
                    alt="Player"
                    src={player.photo}
                    title="Player"
                />
                <img
                    alt="Club"
                    src={player.club_logo}
                    title="Club"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {player.name}
                    </Typography>
                    <Typography component="div">
                        Position favorite : {player.fav_position}
                    </Typography>
                    <Typography component="div">
                        Autres positions : {player.position}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => this.selectPlayer(player)}>
                        Select
                    </Button>
                </CardActions>
            </Card>
        );

        switch (this.state.draftState) {
            case 'not_started':
                return (
                    <Button onClick={this.startDraft}>Start this week draft</Button>
                );
            case 'in_progress':
                return (
                    <div>
                        <p> Draft is in progress </p>
                        { this.state.currentFormation &&
                        <div>
                            {this.state.currentFormation.map(formation => <Button onClick={() => this.selectFormation(formation)} key={formation.name}>{formation.name}</Button>)}
                        </div>}
                        { this.state.draftedFormation &&
                         <div>
                             <p>You choice : {this.state.draftedFormation.name}</p>
                             <div style={{display: "flex", justifyContent: "space-around"}}>
                                 {this.state.draftedFormation.position.filter(onlyUnique).map((position, idx) => <div key={idx}><p>{position}</p><Button onClick={() => this.drawPlayer(position)}>Draft</Button></div>)}
                             </div>
                             <div>
                                 <p>{`You have already selected ${this.state.draftedPlayer.length} players : `} </p>
                                 <List dense>
                                     {this.state.draftedPlayer.map( player => {
                                         return(
                                             <ListItem>
                                                 <ListItemText
                                                     primary={player.name}
                                                     secondary={player.fav_position}
                                                 />
                                             </ListItem>
                                         )
                                     })}
                                 </List>
                                 {this.state.draftedPlayer.map((player, idx) => <div key={idx}>{player.name}</div>)}
                             </div>
                         </div>
                        }
                        { this.state.currentDraw &&
                         <div>
                             <Dialog
                                 style={{backgroundColor: "#616161"}}
                                 fullWidth={true}
                                 maxWidth={"lg"}
                                 open={this.state.playerChoiceInProgress}
                                 onClose={this.handleClose}
                                 aria-labelledby="alert-dialog-title"
                                 aria-describedby="alert-dialog-description"
                                 disableBackdropClick={true}
                                 disableEscapeKeyDown={true}
                             >
                                 <DialogTitle id="alert-dialog-title">{"Select a Player"}</DialogTitle>
                                 <DialogContent>
                                     <DialogContentText id="alert-dialog-description">
                                         <div style={{display: "flex", justifyContent: "space-between"}}>
                                             {this.state.currentDraw.map((player, idx) => <div key={idx}>{MediaCard(player)}</div>)}
                                         </div>
                                     </DialogContentText>
                                 </DialogContent>
                             </Dialog>
                         </div>
                        }
                    </div>
                );
            case 'done':
                return (
                    <p> Draft is done </p>
                );
            default:
                return (
                    <p> Default </p>
                );
        }
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export default withStyles(styles)(Draft);
