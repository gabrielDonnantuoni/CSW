import React from 'react';
import PropTypes from 'prop-types';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import { InputNumber, InputCheckbox } from '../inputs';
import { updateId, addPointAction } from '../../actions';
import { RootState } from '../../reducers';
import { InPointInput } from '../../declarations';
import './PointForm.css';

const { useEffect } = React;

interface StateProps {
  point: InPointInput,
}

interface DispatchProps {
  idToPointState: (id: string) => void,
  addPoint: (point: InPointInput) => void,
}

type Props = PropTypes.InferProps<DispatchProps & StateProps>;
// type Props = DispatchProps & StateProps;

const PointForm = (props: Props) => {
  const { idToPointState, point, addPoint } = props;
  const id = uniqid.process();

  useEffect(() => {
    idToPointState(id);
  }, []);

  const handleClick = () => {
    addPoint(point);
  };

  return (
    <form className="point-form">
      <fieldset className="point-form-cords">
        <legend>Cordenadas</legend>
        <InputNumber name="cordx" label="Cordenada X:" placeHolder="m" />
        <InputNumber name="cordy" label="Cordenada Y:" placeHolder="m" />
      </fieldset>
      <fieldset className="point-form-fs">
        <legend>Forças nodais</legend>
        <InputNumber name="f0" placeHolder="kN" label="Horizontal (f0:↦)" />
        <InputNumber name="f1" placeHolder="kN" label="Vertical (f1:↥)" />
        <InputNumber name="f2" placeHolder="kNm" label="Momento (f2:↶)" />
      </fieldset>
      <fieldset className="point-form-restrictions">
        <legend>Restrições</legend>
        <InputCheckbox name="r0" label="Horizontal (u:↦)" />
        <InputCheckbox name="r1" label="Vertical (v:↥)" />
        <InputCheckbox name="r2" label="Rotação (θ:↶)" />
      </fieldset>
      <button type="button" onClick={ handleClick }>
        Adicionar ponto
      </button>
    </form>
  );
};

const mapDispatch = (dispatch: Dispatch<Action>) => ({
  idToPointState: (id: string) => dispatch(updateId(id)),
  addPoint: (point: InPointInput) => dispatch(addPointAction(point)),
});

const mapState = (state: RootState) => ({
  point: state.point,
});

export default connect(mapState, mapDispatch)(PointForm);
