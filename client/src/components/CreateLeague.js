import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({});

class Login extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <p>CREATE LEAGUE</p>
        )
    }
}

export default withStyles(styles)(Login);
