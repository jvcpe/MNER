import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import API from '../utils/API';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    center : {
        textAlign: 'center',
    }
});

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leagueName: "",
        };
    }

    createLeague = () => {
        API.createLeague(this.state.leagueName).then(function(data){
            window.location = "/dashboard"
        },function(error){
            console.log(error);
            return;
        })
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.center}>
                <p>CREATE LEAGUE</p>
                <form>
                    <TextField
                        required
                        id="leagueName"
                        label="League Name"
                        value={this.state.leagueName}
                        onChange={this.handleChange('leagueName')}
                        className={classes.textField}
                        margin="normal"
                    />
                </form>
                <Button onClick={this.createLeague} color="primary">Create a league</Button>
            </div>
        )
    }
}

export default withStyles(styles)(Login);
