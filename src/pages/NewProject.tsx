import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { InputText } from '../components/inputs';

import { upName } from '../slices/project';
import { useAppSelector } from '../hooks';

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
  const name = useAppSelector((state) => state.project.name);

  const [shouldReset, setShouldReset] = useState(false);

  const handleClick = () => {
    setShouldReset(true);
    history.push(`/${encodeURI(name)}`);
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
        action={ upName }
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
