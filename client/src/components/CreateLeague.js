import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import API from '../utils/API';

import Button from '@material-ui/core/Button';

const styles = theme => ({});

class Login extends React.Component {

    createLeague = () => {
        API.createLeague('test');
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <p>CREATE LEAGUE</p>
                <Button onClick={this.createLeague} color="primary">Create a league</Button>
            </div>
        )
    }
}

export default withStyles(styles)(Login);
