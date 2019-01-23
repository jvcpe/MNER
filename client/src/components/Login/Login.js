import React from 'react';
import API from '../../utils/API';
import { makeStyles } from '@material-ui/styles'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: theme.palette.primary,
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    inputColor: {
        color: 'white',
    },
    dense: {
        marginTop: 19,
    },
}));

function Login() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
    });

    function send(event) {
        if(values.email.length === 0){
            return;
        }
        if(values.password.length === 0){
            return;
        }
        API.login(values.email, values.password).then(function(data){
            localStorage.setItem('token', data.data.token);
            window.location = "/dashboard"
        },function(error){
            console.log(error);
            return;
        })
    };

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <div>
            <form className={classes.container} autoComplete="off">
                <TextField
                    required
                    id="email"
                    label="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    className={classes.textField}
                    InputProps={{classes: {input: classes.inputColor}}}
                    margin="normal"
                />
                <TextField
                    required
                    id="pwd"
                    label="password"
                    value={values.password}
                    onChange={handleChange('password')}
                    className={classes.textField}
                    margin="normal"
                />
            </form>
            <Button type="submit" onClick={send} variant="contained" className={classes.button}>Log In</Button>
        </div>

    )
}

export default Login;
