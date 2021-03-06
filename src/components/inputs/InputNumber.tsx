import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { RootState } from '../../store';
import { toNumericValue, formatInputNumber } from '../../services/math/numberAndText';
import { updateNumeric } from '../../actions';

const { useState, useEffect } = React;

const propTypes = {
  name: PropTypes.string,
  language: PropTypes.string,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
  valueToPointState: PropTypes.func.isRequired,
  shouldReset: PropTypes.bool.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

const InputNumber = (props: Props) => {
  const name = props.name ? props.name : '';
  const language = props.language ? props.language : 'pt-br';
  const placeHolder = props.placeHolder ? props.placeHolder : '';
  const label = props.label ? props.label : '';
  const { valueToPointState, shouldReset } = props;

  const [textValue, setTextValue] = useState('');
  const [numericValue, setNumericValue] = useState(0);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = evt;
    setTextValue(formatInputNumber(value, language));
  };

  useEffect(() => {
    setNumericValue(toNumericValue(textValue));
  }, [textValue]);

  useEffect(() => {
    if (shouldReset) setTextValue('');
  }, [shouldReset]);

  return (
    <label htmlFor={ name }>
      { label }
      <input
        type="text"
        name={ name }
        id={ name }
        value={ textValue }
        onChange={ handleChange }
        placeholder={ placeHolder }
        onBlur={ () => valueToPointState(name, numericValue) }
      />
    </label>
  );
};

const mapDispatch = (dispatch: Dispatch<Action>) => ({
  valueToPointState:
  (name: string, value: number) => dispatch(updateNumeric(name, value)),
});

const mapState = (state: RootState) => ({
  shouldReset: state.pointsList.clearForm,
});

export default connect(mapState, mapDispatch)(InputNumber);
