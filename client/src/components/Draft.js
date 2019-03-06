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

    selectPlayer(position) {
        const _send = {
            draftId : this.state.draftId,
            position,
        };
        API.selectPlayer(_send).then(data => {
            console.log("[Draft] Player chose successfully !");
            console.log(data);
            this.setState({currentDraw : data.data.data});
        },error => {
            console.log(`[Draft] Player wasn't chose successfully ! Error : ${error}`);
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
                    <div>
                        <p> Draft is in progress </p>
                        { this.state.currentFormation &&
                        <div>
                            {this.state.currentFormation.map(formation => <button onClick={() => this.selectFormation(formation)} key={formation.name}>{formation.name}</button>)}
                        </div>}
                        { this.state.draftedFormation &&
                         <div>
                             <p>You choice : {this.state.draftedFormation.name}</p>
                             {this.state.draftedFormation.position.map((position, idx) => <div><p>{position}</p><button key={idx} onClick={() => this.selectPlayer(position)}>Draft</button></div>)}
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

export default withStyles(styles)(Draft);
