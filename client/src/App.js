import React, { Component } from 'react';
import './App.css';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Login from './components/Login';
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";

import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import { PrivateRoute } from './components/PrivateRoutes';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: red,
        secondary: red,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    spacing: {
        unit: 10,
    },
    typography: {
        useNextVariants: true,
    },
});

class App extends Component {
  render() {
    return (
    <MuiThemeProvider theme={theme}>
        <div className="App">
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path ="/signup" component={Signup}/>
                <PrivateRoute path='/dashboard' component={Dashboard} />
            </Switch>
        </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
