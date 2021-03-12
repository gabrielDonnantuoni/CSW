import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Home, NewProject, ProjectHome } from './pages';
import PointForm from './components/PointForm';
import theme from './theme';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={ theme }>
      <Paper square className={ classes.root }>
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/new-project" component={ NewProject } />
          <Route path="/:project/points/new" component={ Home } />
          <Route path="/:project/bars/new" component={ Home } />
          <Route path="/:project/points" component={ Home } />
          <Route path="/:project/bars" component={ Home } />
          <Route path="/:project" component={ ProjectHome } />
        </Switch>
        <PointForm />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
