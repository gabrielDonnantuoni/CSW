import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

import NoProject from './NoProject';
import ProjectCard from './ProjectCard';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

interface Props {
  projects: { name: string }[];
  callback: (value: boolean) => void;
}

const ProjectsCard = (props : Props) => {
  const classes = useStyles();
  const { projects } = props;

  return (
    <Grid container justify="center" item xs={ 12 } className={ classes.root }>
      { projects.length > 0
        ? (projects.map(({ name }) => (
          <ProjectCard key={ name } name={ name } callback={ props.callback } />)))
        : <NoProject /> }
    </Grid>
  );
};

export default ProjectsCard;
