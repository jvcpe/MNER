import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import { Link } from 'react-router-dom'

import API from "../utils/API";


const styles = theme => ({
    card : {
        margin: '2%',
    },
    title : {
        textAlign: 'center',
    },
    chip : {
        textAlign: 'right',
    },
});

class ViewLeague extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leagues : [],
        };
    }

    componentDidMount() {
        API.getLeagues()
            .then(leagues => this.setState({ leagues : leagues.data}));
    }

    render() {
        const {classes} = this.props;

        const cards = this.renderCards(this.state.leagues, classes);

        return (
            <div>
                <h3 className={classes.title}>Leagues</h3>
                { cards }
            </div>
        );
    }

    renderCards = (cards, classes) => {
        if ( cards.length > 0 ) {
            return cards.map((card) => (
                <Card key={card._id} className={classes.card}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {card.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button component={Link} to={`/dashboard/${card._id}`} size="small" color="primary">
                            View
                        </Button>
                        <Chip label={card.state} className={classes.chip} />
                    </CardActions>
                </Card>
            ))
        }
    };
}

export default withStyles(styles)(ViewLeague);
