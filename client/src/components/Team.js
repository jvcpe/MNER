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
            id : "",
            team : [],
            formation : {},
            players : [],
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

            data.data[0].players.forEach(player => {
                if(player.position[0] === "") {
                    player.position[0] = player.fav_position;
                }
            });

            this.setState({
                team : data.data[0].team,
                formation : data.data[0].formation,
                players : data.data[0].players,
                id : data.data[0].id,
                positionList
            });
        },error => {
            console.log(`[Team] Team wasn't retrieved successfully ! Error : ${error}`);
            return;
        })
    }

    handleChange = (idx, event) => {
        let updatedTeam = this.state.team;
        if(updatedTeam.indexOf(event.target.value) !== -1) {
            console.log("here");
            const index = updatedTeam.indexOf(event.target.value);
            if (updatedTeam[idx].fav_position && updatedTeam[idx].position !== this.state.positionList[index]) {
                console.log("The player replaced can't match the position of the replacer player");
            }
            updatedTeam[index] = updatedTeam[idx];
        }
        updatedTeam[idx] = event.target.value;
        this.setState({ team: updatedTeam });
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
                            {this.state.team.map((player, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className={classes.position} component="th" scope="row">
                                        {this.state.positionList[idx]}
                                    </TableCell>
                                    <TableCell>
                                        <Select className={classes.select} value={this.state.team[idx]} onChange={(e) => this.handleChange(idx, e)} inputProps={{placeholder: 'Select a player ...', name: 'player'}}>
                                            {suggestedPlayer(this.state.players, this.state.positionList[idx]).map(player => <MenuItem value={player}>{player.name}</MenuItem>)}
                                        </Select>
                                    </TableCell>
                                    <TableCell><img src={player.club_logo} alt="player"/></TableCell>
                                    <TableCell>{player.fav_position === this.state.positionList[idx] ? "YES" : "NO"}</TableCell>
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
    if(RegExp('^[0-9]*$').test(position.charAt(1))) {
        return list;
    }

    return list.filter(player => player.fav_position === position || player.position.includes(position));
}

export default withStyles(styles)(Team);
