import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Action, Dispatch } from 'redux';

// import { updateR } from '../../actions/pointState';

const { useState, useEffect } = React;

const propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  toState: PropTypes.func.isRequired,
  shouldReset: PropTypes.bool.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

const InputCheckbox = (props: Props) => {
  const name = props.name ? props.name : '';
  const label = props.label ? props.label : '';
  const { toState, shouldReset } = props;

  const [checked, setChecked] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    setChecked(target.checked);
  };

  useEffect(() => {
    toState(name, checked);
  }, [checked]);

  useEffect(() => {
    if (shouldReset) setChecked(false);
  }, [shouldReset]);

  return (
    <label htmlFor={ name }>
      <input
        type="checkbox"
        name={ name }
        id={ name }
        checked={ checked }
        onChange={ handleChange }
      />
      { label }
    </label>
  );
};

// const mapDispatch = (dispatch: Dispatch<Action>) => ({
//   toState:
//     (name: string, value: boolean) => dispatch(updateR(name, value)),
// });

// export default connect(null, mapDispatch)(InputCheckbox);
export default InputCheckbox;
