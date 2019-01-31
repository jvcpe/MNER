import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import API from "../utils/API";


const styles = theme => ({});

class UserProfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user : {},
        };
    }

    componentDidMount() {
        API.getUserDetail(this.props.match.params.id)
            .then(user => this.setState({ user : user.data}));
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <p>ID : {this.state.user._id}</p><br/>
                <p>email : {this.state.user.email}</p>
            </div>
        )
    }
}

export default withStyles(styles)(UserProfil);
