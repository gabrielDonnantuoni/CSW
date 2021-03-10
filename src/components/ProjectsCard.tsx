import React from 'react';
import Grid from '@material-ui/core/Grid';
import NoProject from './NoProject';

interface Props {
  projects: object[];
}

const ProjectsCard = (props : Props) => {
  const { projects } = props;
  return (
    <Grid container justify="center" item xs={ 12 }>
      { projects.length > 0
        ? 'Menor'
        : <NoProject /> }
    </Grid>
  );
};

export default ProjectsCard;
