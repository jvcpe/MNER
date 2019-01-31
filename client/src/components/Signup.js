import React from 'react';
import API from '../utils/API';
import {withStyles} from "@material-ui/core";

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
    }
});

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            pseudo : "",
            password: "",
            cpassword: ""
        };
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    send = event => {
        if(this.state.email.length === 0 || this.state.pseudo.length === 0) {
            return;
        }
        if(this.state.password.length === 0 || this.state.password !== this.state.cpassword) {
            return;
        }
        let _send = {
            'email': this.state.email,
            'pseudo': this.state.pseudo,
            'password': this.state.password
        };
        API.signup(_send).then(function(data){
            window.location = "/"
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
            <div className="Login">
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
                        id="pseudo"
                        label="pseudo"
                        value={this.state.pseudo}
                        onChange={this.handleChange('pseudo')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        required
                        id="password"
                        label="password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        required
                        id="cpassword"
                        label="Confirm password"
                        value={this.state.cpassword}
                        onChange={this.handleChange('cpassword')}
                        className={classes.textField}
                        margin="normal"
                    />
                </form>
                <Button type="submit" onClick={this.send} variant="contained" className={classes.button}>Sign Up</Button>
            </div>
        )
    }
}

export default withStyles(styles)(Signup);

