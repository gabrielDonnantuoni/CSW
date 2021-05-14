import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import ProjectHeader from '../components/ProjectHeader';
import { useAppSelector, useTimer } from '../hooks';
import { saveProject } from '../services/storage';
import { FIVE_MINUTES } from '../consts';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const ProjectHome = () => {
  const classes = useStyles();
  const history = useHistory();

  const name = useAppSelector((state) => state.project.name);
  const projectState = useAppSelector((state) => state.project);

  useTimer(saveProject, FIVE_MINUTES, projectState);

  return (
    <Grid
      container
      className={ classes.root }
    >
      <ProjectHeader history={ history } projectName={ name } />
    </Grid>
  );
};

export default ProjectHome;
