import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import API from "../utils/API";
import Button from "@material-ui/core/es/Button/Button";


const styles = theme => ({});

class Admin extends React.Component {

    importPlayer = event => {
        API.importPlayer();
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button onClick={this.importPlayer}>Import players</Button>
            </div>
        )
    }
}

export default withStyles(styles)(Admin);
