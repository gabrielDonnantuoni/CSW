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

import { InputNumber, InputCheckbox } from '../inputs';
import { addPoint, editPoint } from '../../slices/project';
import { useAppDispatch } from '../../hooks';
import { HALF_SECOND } from '../../consts';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#424242',
    maxWidth: '620px',
    borderRadius: '5px',
    '& > *': {
      borderBottom: '1px solid white',
    },
    '& > :last-child': {
      border: 'none',
    },
  },
  formGroup: {
    flexDirection: 'row',
    '& > *': {
      margin: '0 10px 5px',
    },
  },
  fieldsetWrapper: {
    width: 'calc(100% - 28px)',
    margin: '0 14px',
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
  const [shouldReset, setShouldReset] = useState(false);

  const closeForm = () => {
    props.setShowForm(false);
    setShouldReset(true);
    setTimeout(() => setShouldReset(false), HALF_SECOND);
  };

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

    closeForm();
  };

  return (
    <Grid
      container
      className={ classes.root }
      component="form"
      direction="column"
      alignItems="center"
      spacing={ 3 }
      item
      xs={ 10 }
      sm={ 8 }
      md={ 6 }
      lg={ 5 }
    >
      <Grid item container justify="space-between" alignItems="center">
        <Typography variant="h4">{ name }</Typography>
        <IconButton onClick={ closeForm }>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item className={ classes.fieldsetWrapper }>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography variant="h6">Coordenadas</Typography>
          </FormLabel>
          <FormGroup className={ classes.formGroup }>
            <InputNumber
              name="coordx"
              label="Coordenada X"
              unit="m"
              stateUpdater={ setCordX }
              defaultValue={ props.defaultValues?.cordX }
              shouldReset={ shouldReset }
            />
            <InputNumber
              name="coordy"
              label="Coordenada Y"
              unit="m"
              stateUpdater={ setCordY }
              defaultValue={ props.defaultValues?.cordY }
              shouldReset={ shouldReset }
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item className={ classes.fieldsetWrapper }>
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
              shouldReset={ shouldReset }
            />
            <InputNumber
              name="f1"
              unit="kN"
              label="Vertical (f1:↥)"
              stateUpdater={ setF1 }
              defaultValue={ props.defaultValues?.f[1] }
              shouldReset={ shouldReset }
            />
            <InputNumber
              name="f2"
              unit="kNm"
              label="Momento (f2:↶)"
              stateUpdater={ setF2 }
              defaultValue={ props.defaultValues?.f[2] }
              shouldReset={ shouldReset }
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item className={ classes.fieldsetWrapper }>
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
              shouldReset={ shouldReset }
            />
            <InputCheckbox
              name="r1"
              label="Vertical (v:↥)"
              stateUpdater={ setR1 }
              defaultValue={ props.defaultValues?.r[1] }
              shouldReset={ shouldReset }
            />
            <InputCheckbox
              name="r2"
              label="Rotação (θ:↶)"
              stateUpdater={ setR2 }
              defaultValue={ props.defaultValues?.r[2] }
              shouldReset={ shouldReset }
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
