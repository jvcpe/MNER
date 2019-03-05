import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import API from "../utils/API";
import Button from "@material-ui/core/es/Button/Button";


const styles = theme => ({});

class Draft extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
        });
    }

    startDraft = event => {
        API.startDraft(this.state.draftId).then(function(data){
            console.log("[Draft] Draft started succesfully !");
            console.log(data);
            this.setState({status : 'in_progress', currentFormation : data.currentFormation});
        },function(error){
            console.log(`[Draft] Draft did not started succesfully ! Error : ${error}`);
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
                    <Button onClick={this.startDraft}>Start this week draft</Button>
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
