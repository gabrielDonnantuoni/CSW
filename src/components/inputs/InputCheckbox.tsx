import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { updateR } from '../../actions/pointState';

const { useState, useEffect } = React;

const propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  rToPointState: PropTypes.func,
};

type Props = PropTypes.InferProps<typeof propTypes>;

const InputCheckbox = (props: Props) => {
  const name = props.name ? props.name : '';
  const label = props.label ? props.label : '';
  const rToPointState = props.rToPointState ? props.rToPointState : () => {};

  const [checked, setChecked] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    setChecked(target.checked);
  };

  useEffect(() => {
    rToPointState(name, checked);
  }, [checked]);

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

export default connect(null, mapDispatch)(InputCheckbox);
