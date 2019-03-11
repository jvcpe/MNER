import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import API from "../utils/API";
import constants from '../constants';

const styles = theme => ({
    center : {
        textAlign : 'center',
    },
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        margin: 'auto',
    },
    table: {
        minWidth: 700,
    },
    position: {
        width: 30,
    },
    select: {
        width: 400,
    }
});

class Team extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            team : {
                team : [],
            },
            positionList : [],
        };
    }

    componentDidMount() {
        API.getTeam(localStorage.getItem('user')).then(data => {
            console.log(data);
            let positionList = data.data[0].formation.position;
            for(let i = 0; i < constants.NUMBER_OF_SUBSTITUTE_IN_TEAM; i++) {
                positionList.push(`R${i+1}`);
            }
            this.setState({team : data.data[0], positionList});
        },error => {
            console.log(`[Team] Team wasn't retrieved successfully ! Error : ${error}`);
            return;
        })
    }

    handleChange = (idx, event) => {
        let 
        this.setState({ team: event.target.value });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.center}>
                <h3>TEAM</h3>

                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.position}>Position</TableCell>
                                <TableCell className={classes.select}>Select Player</TableCell>
                                <TableCell>Club</TableCell>
                                <TableCell>Favorite Position</TableCell>
                                <TableCell align="right">Chemistry</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.team.team.map((player, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className={classes.position} component="th" scope="row">
                                        {this.state.positionList[idx]}
                                    </TableCell>
                                    <TableCell>
                                        <Select className={classes.select} value={this.state.team.team[idx]} onChange={() => this.handleChange(idx)} inputProps={{placeholder: 'Select a player ...', name: 'player'}}>
                                            {suggestedPlayer(this.state.team.players, this.state.positionList[idx]).map(player => <MenuItem value={player}>{player.name}</MenuItem>)}
                                        </Select>
                                    </TableCell>
                                    <TableCell>INFO</TableCell>
                                    <TableCell>COLLECTIF</TableCell>
                                    <TableCell align="right">CHEMISTRY</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

function suggestedPlayer(list, position) {
    if(position.charAt(1) === "^[0-9]*$") {
        console.log('test');
        return list;
    }

    return list.filter(player => (player.fav_position || player.position) === position);
}

export default withStyles(styles)(Team);
