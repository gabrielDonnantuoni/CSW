import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { updateR } from '../../actions/pointState';
import { RootState } from '../../store';

const { useState, useEffect } = React;

const propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  rToPointState: PropTypes.func.isRequired,
  shouldReset: PropTypes.bool.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

const InputCheckbox = (props: Props) => {
  const name = props.name ? props.name : '';
  const label = props.label ? props.label : '';
  const { rToPointState, shouldReset } = props;

  const [checked, setChecked] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    setChecked(target.checked);
  };

  useEffect(() => {
    rToPointState(name, checked);
  }, [checked]);

  useEffect(() => {
    if (shouldReset) setChecked(false);
  }, [shouldReset]);

  return (
    <label htmlFor={ name }>
      { label }
      <input
        type="checkbox"
        name={ name }
        id={ name }
        checked={ checked }
        onChange={ handleChange }
      />
    </label>
  );
};

const mapDispatch = (dispatch: Dispatch<Action>) => ({
  rToPointState:
    (name: string, value: boolean) => dispatch(updateR(name, value)),
});

const mapState = (state: RootState) => ({
  shouldReset: state.pointsList.clearForm,
});

export default connect(mapState, mapDispatch)(InputCheckbox);
