import React, { useState } from 'react';
import uniqid from 'uniqid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import { InputNumber, InputCheckbox } from './inputs';
import { addPoint, editPoint } from '../slices/project';
import { useAppDispatch } from '../hooks';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#424242',
    width: 'clamp(224px, 38vw, 444px)',
    borderRadius: '5px',
    '& > *': {
      borderBottom: '1px solid white',
    },
    '& > :last-child': {
      border: 'none',
    },
  },
  formGroup: {
    width: 'clamp(180px, 30vw, 400px)',
    '& > *': {
      marginBottom: '5px',
    },
  },
  iconBtn: {
    padding: '0',
  },
});

interface Props {
  defaultValues?: {
    id: string;
    cordX: string;
    cordY: string;
    f: [string, string, string];
    r: [boolean, boolean, boolean];
  };
  setShowForm: (value: boolean) => void;
}

type F = [number, number, number];
type R = [boolean, boolean, boolean];

const PointForm = (props: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const id = props.defaultValues?.id ? props.defaultValues.id : uniqid.process('point-');

  const name = (props.defaultValues)
    ? `Ponto (${props.defaultValues.cordX} ; ${props.defaultValues.cordY})`
    : 'Novo Ponto';

  const [cordX, setCordX] = useState(0);
  const [cordY, setCordY] = useState(0);
  const [f0, setF0] = useState(0);
  const [f1, setF1] = useState(0);
  const [f2, setF2] = useState(0);
  const [r0, setR0] = useState(false);
  const [r1, setR1] = useState(false);
  const [r2, setR2] = useState(false);

  const handleClick = () => {
    const point = {
      id,
      cordX,
      cordY,
      f: [f0, f1, f2] as F,
      restrictions: [r0, r1, r2] as R,
    };

    if (props.defaultValues) {
      dispatch(editPoint(point));
    } else {
      dispatch(addPoint(point));
    }
    props.setShowForm(false);
  };

  return (
    <Grid
      container
      className={ classes.root }
      component="form"
      direction="column"
      alignItems="center"
      spacing={ 3 }
    >
      <Grid item container justify="space-between" alignItems="center">
        <Typography variant="h4">{ name }</Typography>
        <IconButton onClick={ () => props.setShowForm(false) }>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography variant="h6">Cordenadas</Typography>
          </FormLabel>
          <FormGroup className={ classes.formGroup }>
            <InputNumber
              name="cordx"
              label="Cordenada X:"
              unit="m"
              stateUpdater={ setCordX }
              defaultValue={ props.defaultValues?.cordX }
            />
            <InputNumber
              name="cordy"
              label="Cordenada Y:"
              unit="m"
              stateUpdater={ setCordY }
              defaultValue={ props.defaultValues?.cordY }
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography variant="h6">Forças nodais</Typography>
          </FormLabel>
          <FormGroup className={ classes.formGroup }>
            <InputNumber
              name="f0"
              unit="kN"
              label="Horizontal (f0:↦)"
              stateUpdater={ setF0 }
              defaultValue={ props.defaultValues?.f[0] }
            />
            <InputNumber
              name="f1"
              unit="kN"
              label="Vertical (f1:↥)"
              stateUpdater={ setF1 }
              defaultValue={ props.defaultValues?.f[1] }
            />
            <InputNumber
              name="f2"
              unit="kNm"
              label="Momento (f2:↶)"
              stateUpdater={ setF2 }
              defaultValue={ props.defaultValues?.f[2] }
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography variant="h6">Restrições</Typography>
          </FormLabel>
          <FormGroup className={ classes.formGroup }>
            <InputCheckbox
              name="r0"
              label="Horizontal (u:↦)"
              stateUpdater={ setR0 }
              defaultValue={ props.defaultValues?.r[0] }
            />
            <InputCheckbox
              name="r1"
              label="Vertical (v:↥)"
              stateUpdater={ setR1 }
              defaultValue={ props.defaultValues?.r[1] }
            />
            <InputCheckbox
              name="r2"
              label="Rotação (θ:↶)"
              stateUpdater={ setR2 }
              defaultValue={ props.defaultValues?.r[2] }
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={ handleClick }
          fullWidth
        >
          {props.defaultValues ? 'Atualizar ponto' : 'Adicionar ponto'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PointForm;
