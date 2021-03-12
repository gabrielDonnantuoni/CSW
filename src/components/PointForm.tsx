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

const PointForm = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const point = useAppSelector((state) => state.point.point);
  const shouldReset = useAppSelector((state) => state.point.shouldReset);

  const id = uniqid.process();

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
    <Grid container component="form" direction="column" alignItems="center" spacing={ 3 }>
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
            />
            <InputNumber
              name="cordy"
              label="Cordenada Y:"
              unit="m"
              shouldReset={ shouldReset }
              action={ upCordY }
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
            />
            <InputNumber
              name="f1"
              unit="kN"
              label="Vertical (f1:↥)"
              shouldReset={ shouldReset }
              action={ upFs }
              actionParams={ [1] }
            />
            <InputNumber
              name="f2"
              unit="kNm"
              label="Momento (f2:↶)"
              shouldReset={ shouldReset }
              action={ upFs }
              actionParams={ [2] }
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
            />
            <InputCheckbox
              name="r1"
              label="Vertical (v:↥)"
              shouldReset={ shouldReset }
              action={ upRs }
              actionParams={ [1] }
            />
            <InputCheckbox
              name="r2"
              label="Rotação (θ:↶)"
              shouldReset={ shouldReset }
              action={ upRs }
              actionParams={ [2] }
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          className={ classes.button }
          type="button"
          variant="contained"
          color="primary"
          onClick={ handleClick }
        >
          Adicionar ponto
        </Button>
      </Grid>
    </Grid>
  );
};

export default PointForm;
