import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Template = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={ classes.root }
    >
      <input />
    </Grid>
  );
};

export default Template;
