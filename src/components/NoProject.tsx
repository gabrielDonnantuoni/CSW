import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '80%',
  },
});

const NoProject = () => {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={ classes.root }>
      <Typography variant="h6">
        Nenhum projeto ainda...
      </Typography>
    </Card>
  );
};

export default NoProject;
