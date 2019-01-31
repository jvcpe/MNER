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

class JoinLeague extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leagueCode : '',
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    send = event => {
        if(this.state.leagueCode.length === 0){
            return;
        }
        let _send = {
            'user': localStorage.getItem('user'),
            'league': this.state.leagueCode
        };
        API.joinLeague(_send).then(function(data){
            console.log('success');
        },function(error){
            console.log(error);
            return;
        })
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.center}>
                <h3>JOIN LEAGUE</h3>
                <form className={classes.container} autoComplete="off">
                    <TextField
                        required
                        id="leagueCode"
                        label="League code"
                        value={this.state.leagueCode}
                        onChange={this.handleChange('leagueCode')}
                        className={classes.textField}
                        margin="normal"
                    />
                </form>
                <Button type="submit" onClick={this.send} variant="contained" className={classes.button}>Join League</Button>
            </div>
        )
    }
}

export default withStyles(styles)(JoinLeague);
