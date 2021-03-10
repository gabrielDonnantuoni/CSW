/* eslint-disable no-magic-numbers */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PointForm from './components/PointForm';
import { Home } from './pages';
import theme from './theme';
// import './App.css';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={ theme }>
      <Paper square className={ classes.root }>
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/new-project" component={ Home } />
          <Route path="/:project/points/:id" component={ Home } />
          <Route path="/:project/bars/:id" component={ Home } />
          <Route path="/:project/points" component={ Home } />
        </Switch>
        <PointForm />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
