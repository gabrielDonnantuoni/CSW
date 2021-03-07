import React from 'react';
import PropTypes from 'prop-types';
import { toNumericValue, formatInputNumber } from '../../services/math/numberAndText';

const { useState, useEffect } = React;

const propTypes = {
  name: PropTypes.string,
  language: PropTypes.string,
  placeHolder: PropTypes.string,
  label: PropTypes.string,
  default: PropTypes.string,
  toState: PropTypes.func.isRequired,
  shouldReset: PropTypes.bool.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

const InputNumber = (props: Props) => {
  const name = props.name ? props.name : '';
  const language = props.language ? props.language : 'pt-br';
  const placeHolder = props.placeHolder ? props.placeHolder : '';
  const label = props.label ? props.label : '';
  const defaultValue = props.default ? props.default : '';
  const { toState, shouldReset } = props;

  const [textValue, setTextValue] = useState(defaultValue);
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
        onBlur={ () => toState(name, numericValue) }
      />
    </label>
  );
};

export default InputNumber;
