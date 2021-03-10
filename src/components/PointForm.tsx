import React from 'react';
// import PropTypes from 'prop-types';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import uniqid from 'uniqid';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { InputNumber, InputCheckbox } from './inputs';
import { updateId, addPointAndResetForm, resetPointAction, updateR,
  updateCordsAndFs } from '../actions';
import { RootState } from '../store';
import { InPointInput } from '../declarations';

const { useEffect } = React;

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  idToPointState: (id: string) => dispatch(updateId(id)),
  rToPointState: (name: string, value: boolean) => dispatch(updateR(name, value)),
  numberToPointState:
    (name: string, value: number) => dispatch(updateCordsAndFs(name, value)),
  addPoint: (point: InPointInput) => dispatch(addPointAndResetForm(point)),
  resetPoint: () => dispatch(resetPointAction()),
});

const mapState = (state: RootState) => ({
  point: state.point,
  shouldReset: state.pointsList.clearForm,
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

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

const PointForm = (props: Props) => {
  const classes = useStyles();
  const { idToPointState, point, addPoint, resetPoint, shouldReset,
    rToPointState, numberToPointState } = props;
  const id = uniqid.process();

  useEffect(() => {
    idToPointState(id);
  }, []);

  const handleClick = () => {
    addPoint(point);
    resetPoint();
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
              toState={ numberToPointState }
            />
            <InputNumber
              name="cordy"
              label="Cordenada Y:"
              unit="m"
              shouldReset={ shouldReset }
              toState={ numberToPointState }
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
              toState={ numberToPointState }
            />
            <InputNumber
              name="f1"
              unit="kN"
              label="Vertical (f1:↥)"
              shouldReset={ shouldReset }
              toState={ numberToPointState }
            />
            <InputNumber
              name="f2"
              unit="kNm"
              label="Momento (f2:↶)"
              shouldReset={ shouldReset }
              toState={ numberToPointState }
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
              toState={ rToPointState }
            />
            <InputCheckbox
              name="r1"
              label="Vertical (v:↥)"
              shouldReset={ shouldReset }
              toState={ rToPointState }
            />
            <InputCheckbox
              name="r2"
              label="Rotação (θ:↶)"
              shouldReset={ shouldReset }
              toState={ rToPointState }
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

export default connector(PointForm);
