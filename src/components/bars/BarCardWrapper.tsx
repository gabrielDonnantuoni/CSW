import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { BarForm } from '../forms';

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: 1000,
  },
  addBtnWrapper: {
    width: '438.203px',
    margin: '0 8px 16px 8px',
    '& > button': {
      height: '283px',
      width: '100%',
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
}));

interface Props {
  type: 'beam' | 'pillar';
}

const BarCardWrapper = (props: Props) => {
  const classes = useStyles();

  const [showBeamForm, setShowBeamForm] = useState(false);
  const [showPillarForm, setShowPillarForm] = useState(false);

  const showForm = () => {
    const show = props.type === 'beam' ? setShowBeamForm : setShowPillarForm;
    show(true);
  };

  return (
    <Grid container wrap="wrap" alignContent="center" justify="center">
      <Button
        type="button"
        variant="contained"
        onClick={ showForm }
      >
        <AddIcon style={ { fontSize: 40 } } />
      </Button>
      <Backdrop open={ showBeamForm } className={ classes.backdrop }>
        <BarForm setShowForm={ setShowBeamForm } type="beam" />
      </Backdrop>
      <Backdrop open={ showPillarForm } className={ classes.backdrop }>
        <BarForm setShowForm={ setShowPillarForm } type="pillar" />
      </Backdrop>
    </Grid>
  );
};

export default BarCardWrapper;
