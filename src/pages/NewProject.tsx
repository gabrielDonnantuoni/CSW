import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { InputText } from '../components/inputs';
import { upName } from '../slices/project';
import { useAppDispatch } from '../hooks';
import { HALF_SECOND } from '../consts';

const useStyles = makeStyles({
  root: {
    width: '100%',
    '& > *': {
      width: 'clamp(50px, 50%, 400px)',
      marginBottom: '16px',
    },
    '& .MuiFormControl-root': {
      marginTop: '30vh',
    },
    '& input, & label, & button': {
      fontSize: '1.7rem',
    },
  },
});

const NewProject = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [projectName, setProjectName] = useState('');
  const [shouldReset, setShouldReset] = useState(false);

  const handleClick = () => {
    dispatch(upName(projectName));
    setShouldReset(true);
    history.push(`/${encodeURI(projectName)}`);
    setTimeout(() => setShouldReset(false), HALF_SECOND);
  };

  return (
    <Grid
      container
      className={ classes.root }
      direction="column"
      alignItems="center"
    >
      <InputText
        name="project-name"
        label="Nome do projeto"
        stateUpdater={ setProjectName }
        shouldReset={ shouldReset }
      />
      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={ handleClick }
      >
        Iniciar projeto
      </Button>
    </Grid>
  );
};

export default NewProject;
