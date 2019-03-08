import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from "../utils/API";

const styles = theme => ({
    center : {
        textAlign : 'center',
    }
});

class Team extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            team : {},
        };
    }

    componentDidMount() {
        API.getTeam(localStorage.getItem('user')).then(data => {
            console.log(data);
            this.setState({team : data.team});
        },error => {
            console.log(`[Team] Team wasn't retrieved successfully ! Error : ${error}`);
            return;
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.center}>
                <h3>TEAM</h3>
            </div>
        )
    }
}

export default withStyles(styles)(Team);
