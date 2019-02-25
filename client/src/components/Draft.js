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
        API.getDraftState().then(function(data){
            console.log("success");
        },function(error){
            console.log(error);
            return;
        })
    }

    startDraft = event => {
        let _send = {
            'userId': localStorage.getItem('user')
        };
        API.startDraft().then(function(data){
            console.log("success");
            //update state
        },function(error){
            console.log(error);
            return;
        })
    };

    selectPlayer = event => {
        API.selectPlayer().then(function(data){
            console.log("success");
        },function(error){
            console.log(error);
            return;
        })
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
