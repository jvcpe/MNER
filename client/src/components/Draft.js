import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import API from "../utils/API";
import Button from "@material-ui/core/es/Button/Button";


const styles = theme => ({});

class Draft extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            draftState : 'not_started',
            draftedPlayer : [],
            currentDraw: []
        };
    }

    componentDidMount() {
        // call for drafts state
    }

    startDraft = event => {
        let _send = {
            'userId': localStorage.getItem('user')
        };
        API.startDraft(_send).then(function(data){
            // call for drafts state
        },function(error){
            console.log(error);
            return;
        })
    };

    selectPlayer = event => {
        //select a player
    };

    nextDraw = event => {
        //call next draw
    };

    render() {
        const {classes} = this.props;

        const displayInProgressDraft = (
            <p> Draft is in progress </p>
        );

        const displayDoneDraft = (
            <p> Draft is done </p>
        );

        switch (this.state.draftState) {
            case 'not_started':
                return (
                    <Button>Start this week draft</Button>
                );
            case 'in_progress':
                return (
                    {displayInProgressDraft}
                );
            case 'done':
                return (
                    {displayDoneDraft}
                );
            default:
                return (
                    <p> Default </p>
                );
        }
    }
}

export default withStyles(styles)(Draft);
