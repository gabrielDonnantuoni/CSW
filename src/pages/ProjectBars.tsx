import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';

import ProjectHeader from '../components/ProjectHeader';
import { useAppSelector, useTimer } from '../hooks';
import { saveProject } from '../services/storage';
import { BarForm } from '../components/forms';
import { InputText } from '../components/inputs';
import { FIVE_MINUTES } from '../consts';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  backdrop: {
    zIndex: 1000,
  },
});

const ProjectBars = () => {
  const classes = useStyles();
  const history = useHistory();

  const name = useAppSelector((state) => state.project.name);
  const projectState = useAppSelector((state) => state.project);

  const [showBeamForm, setShowBeamForm] = useState(false);
  const [showPillarForm, setShowPillarForm] = useState(false);
  const [filterType, setFilterType] = useState('beam');
  const [filterName, setFilterName] = useState('');

  useTimer(saveProject, FIVE_MINUTES, projectState);

  return (
    <Grid
      container
      className={ classes.root }
    >
      <ProjectHeader history={ history } projectName={ name } />
      <Grid container justify="center">
        <Typography variant="h3" gutterBottom>Suas Barras</Typography>
      </Grid>
      <Grid>
        <Button
          type="button"
          variant="outlined"
          onClick={ () => setFilterType('beam') }
        >
          Vigas
        </Button>
        <InputText
          name="bar-filter"
          label="Filtre por nome"
          shouldReset={ false }
          stateUpdater={ setFilterName }
        />
        <Button
          type="button"
          variant="outlined"
          onClick={ () => setFilterType('pillar') }
        >
          Pilares
        </Button>
      </Grid>
      <Backdrop open={ showBeamForm } className={ classes.backdrop }>
        <BarForm setShowForm={ setShowBeamForm } type="beam" />
      </Backdrop>
      <Backdrop open={ showPillarForm } className={ classes.backdrop }>
        <BarForm setShowForm={ setShowPillarForm } type="pillar" />
      </Backdrop>
    </Grid>
  );
};

export default ProjectBars;
