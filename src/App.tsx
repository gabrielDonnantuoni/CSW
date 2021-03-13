import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Home, NewProject, ProjectHome, ProjectPoints, ProjectBars } from './pages';
import theme from './theme';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    width: '100%',
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
          <Route path="/:project/points" component={ ProjectPoints } />
          <Route path="/:project/bars" component={ ProjectBars } />
          <Route path="/:project" component={ ProjectHome } />
        </Switch>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
