import React, { useEffect } from 'react';
import uniqid from 'uniqid';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { InputNumber, InputCheckbox } from './inputs';
import { upId, upCordX, upCordY, upFs, upRs,
  resetForm, unResetForm } from '../slices/point';
import { addPoint } from '../slices/project';
import { useAppDispatch, useAppSelector } from '../hooks';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  formGroup: {
    width: 'clamp(200px, 30vw, 400px)',
    '& > *': {
      marginBottom: '5px',
    },
  },
  button: {
    width: 'clamp(200px, 30vw, 400px)',
  },
});

interface Props {
  id?: string;
  cordX?: string;
  cordY?: string;
  f?: [string, string, string];
  r?: [boolean, boolean, boolean];
}

const PointForm = (props: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const point = useAppSelector((state) => state.point.point);
  const shouldReset = useAppSelector((state) => state.point.shouldReset);

  let id: string;
  if (props.id) id = props.id;
  else id = uniqid.process('point-');

  useEffect(() => {
    dispatch(upId(id));
  }, []);

  const clearForm = () => Promise.resolve(dispatch(resetForm()))
    .then(() => dispatch(unResetForm()));

  const handleClick = () => {
    dispatch(addPoint(point));
    clearForm();
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
              shouldReset={ shouldReset }
              action={ upCordX }
              defaultValue={ props.cordX }
            />
            <InputNumber
              name="cordy"
              label="Cordenada Y:"
              unit="m"
              shouldReset={ shouldReset }
              action={ upCordY }
              defaultValue={ props.cordY }
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
              shouldReset={ shouldReset }
              action={ upFs }
              actionParams={ [0] }
              defaultValue={ props.f && props.f[0] }
            />
            <InputNumber
              name="f1"
              unit="kN"
              label="Vertical (f1:↥)"
              shouldReset={ shouldReset }
              action={ upFs }
              actionParams={ [1] }
              defaultValue={ props.f && props.f[1] }
            />
            <InputNumber
              name="f2"
              unit="kNm"
              label="Momento (f2:↶)"
              shouldReset={ shouldReset }
              action={ upFs }
              actionParams={ [2] }
              defaultValue={ props.f && props.f[2] }
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
              shouldReset={ shouldReset }
              action={ upRs }
              actionParams={ [0] }
              defaultValue={ props.r && props.r[0] }
            />
            <InputCheckbox
              name="r1"
              label="Vertical (v:↥)"
              shouldReset={ shouldReset }
              action={ upRs }
              actionParams={ [1] }
              defaultValue={ props.r && props.r[1] }
            />
            <InputCheckbox
              name="r2"
              label="Rotação (θ:↶)"
              shouldReset={ shouldReset }
              action={ upRs }
              actionParams={ [2] }
              defaultValue={ props.r && props.r[2] }
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          className={ classes.button }
          type="button"
          variant="contained"
          color="secondary"
          onClick={ handleClick }
        >
          Adicionar ponto
        </Button>
      </Grid>
    </Grid>
  );
};

export default PointForm;
