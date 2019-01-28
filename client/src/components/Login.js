import React from 'react';
import API from '../utils/API';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Login extends React.Component {
    state = {
        email: '',
        password: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    send = event => {
        if(this.state.email.length === 0){
            return;
        }
        if(this.state.password.length === 0){
            return;
        }
        API.login(this.state.email, this.state.password).then(function(data){
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', data.data._id);
            window.location = "/dashboard"
        },function(error){
            console.log(error);
            return;
        })
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <form className={classes.container} autoComplete="off">
                    <TextField
                        required
                        id="email"
                        label="email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        required
                        id="pwd"
                        label="password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        className={classes.textField}
                        margin="normal"
                    />
                </form>
                <Button type="submit" onClick={this.send} variant="contained" className={classes.button}>Log In</Button>
            </div>
        )
    }
}

export default withStyles(styles)(Login);
