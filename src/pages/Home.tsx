import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ProjectsCard from '../components/ProjectsCard';
import { verifyExistingProjects } from '../services/storage';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '0',
    width: '100%',
  },
  paper: {
    width: 'clamp(280px, 75vw, 1200px)',
    padding: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  const initialProjects: ReturnType<typeof verifyExistingProjects> = [];
  const [projects, setProjects] = useState(initialProjects);
  const [shouldRerender, setShouldRerender] = useState(false);

  const toNewProject = () => {
    history.push('/new-project');
  };

  const rerender = (value: boolean) => {
    setShouldRerender(value);
  };

  useEffect(() => {
    const existingProjects = verifyExistingProjects();
    setProjects(existingProjects);
  }, []);

  useEffect(() => {
    if (shouldRerender) {
      const existingProjects = verifyExistingProjects();
      setProjects(existingProjects);
      setShouldRerender(false);
    }
  }, [shouldRerender]);

  return (
    <Grid
      container
      className={ classes.root }
      direction="column"
      justify="center"
      alignItems="center"
      spacing={ 2 }
    >
      <Grid item xs={ 12 }>
        <Typography align="center" variant="h1" gutterBottom>
          Calc Structure Web
        </Typography>
      </Grid>
      <Grid item>
        <Paper elevation={ 4 } className={ classes.paper }>
          <Typography align="center" variant="h3" gutterBottom>Seus Projetos</Typography>
          <ProjectsCard projects={ projects } callback={ rerender } />
        </Paper>
      </Grid>
      <Grid item xs={ 3 }>
        <Button
          type="button"
          onClick={ toNewProject }
          variant="contained"
          color="secondary"
        >
          Iniciar novo projeto
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
