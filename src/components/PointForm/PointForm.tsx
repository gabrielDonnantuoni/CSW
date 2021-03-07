import React from 'react';
// import PropTypes from 'prop-types';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import uniqid from 'uniqid';
import Button from '@material-ui/core/Button';
import { InputNumber, InputCheckbox } from '../inputs';
import { updateId, addPointAndResetForm, resetPointAction, updateR,
  updateCordsAndFs } from '../../actions';
import { RootState } from '../../store';
import { InPointInput } from '../../declarations';
import './PointForm.css';

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

const PointForm = (props: Props) => {
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
    <form className="point-form">
      <fieldset className="point-form-cords">
        <legend>Cordenadas</legend>
        <InputNumber
          name="cordx"
          label="Cordenada X:"
          placeHolder="m"
          shouldReset={ shouldReset }
          toState={ numberToPointState }
        />
        <InputNumber
          name="cordy"
          label="Cordenada Y:"
          placeHolder="m"
          shouldReset={ shouldReset }
          toState={ numberToPointState }
        />
      </fieldset>
      <fieldset className="point-form-fs">
        <legend>Forças nodais</legend>
        <InputNumber
          name="f0"
          placeHolder="kN"
          label="Horizontal (f0:↦)"
          shouldReset={ shouldReset }
          toState={ numberToPointState }
        />
        <InputNumber
          name="f1"
          placeHolder="kN"
          label="Vertical (f1:↥)"
          shouldReset={ shouldReset }
          toState={ numberToPointState }
        />
        <InputNumber
          name="f2"
          placeHolder="kNm"
          label="Momento (f2:↶)"
          shouldReset={ shouldReset }
          toState={ numberToPointState }
        />
      </fieldset>
      <fieldset className="point-form-restrictions">
        <legend>Restrições</legend>
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
      </fieldset>
      <Button type="button" onClick={ handleClick }>
        Adicionar ponto
      </Button>
    </form>
  );
};

export default connector(PointForm);
