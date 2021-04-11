import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import ProjectHeader from '../components/ProjectHeader';
import { useAppSelector, useTimer } from '../hooks';
import { saveProject } from '../services/storage';
import PointCard from '../components/points/PointCard';
import PointForm from '../components/PointForm';

const FIVE_MINUTES = 300000;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    paddingBottom: '16px',
  },
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

const ProjectPoints = () => {
  const classes = useStyles();
  const history = useHistory();

  const name = useAppSelector((state) => state.project.name);
  const projectState = useAppSelector((state) => state.project);

  useTimer(saveProject, FIVE_MINUTES, projectState);

  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => { setShowForm(true); };

  return (
    <Grid
      container
      className={ classes.root }
    >
      <ProjectHeader history={ history } projectName={ name } />
      <Grid container justify="center">
        <Typography variant="h3" gutterBottom>Seus Pontos</Typography>
      </Grid>
      <Grid item container wrap="wrap" alignContent="center" justify="center">
        { projectState.inputs.points.map((point) => (
          <PointCard key={ point.id } point={ point } />
        )) }
        <Grid item className={ classes.addBtnWrapper }>
          <Button
            type="button"
            variant="contained"
            onClick={ handleOpenForm }
          >
            <AddIcon style={ { fontSize: 40 } } />
          </Button>
        </Grid>
      </Grid>
      <Backdrop open={ showForm } className={ classes.backdrop }>
        <PointForm setShowForm={ setShowForm } />
      </Backdrop>
    </Grid>
  );
};

export default ProjectPoints;
