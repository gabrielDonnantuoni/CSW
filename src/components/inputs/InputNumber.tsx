import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { toNumericValue, formatInputNumber } from '../../services/math/numberAndText';

const { useState, useEffect } = React;

interface Props {
  name?: string;
  language?: string;
  unit?: string;
  label?: string;
  defaultValue?: string;
  stateUpdater: (...params: any[]) => void;
  fullWidth?: boolean;
}

const InputNumber = (props: Props) => {
  const name = props.name ? props.name : '';
  const language = props.language ? props.language : 'pt-br';
  const unit = props.unit ? props.unit : '';
  const label = props.label ? props.label : '';
  const fullWidth = props.fullWidth ? props.fullWidth : true;
  const { stateUpdater } = props;

  const [textValue, setTextValue] = useState('');
  const [numericValue, setNumericValue] = useState(0);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = evt;
    setTextValue(formatInputNumber(value, language));
  };

  useEffect(() => {
    if (props.defaultValue) setTextValue(props.defaultValue);
  }, []);

  useEffect(() => {
    setNumericValue(toNumericValue(textValue));
  }, [textValue]);

  useEffect(() => {
    stateUpdater(numericValue);
  }, [numericValue]);

  return (
    <TextField
      label={ label }
      id={ name }
      name={ name }
      value={ textValue }
      onChange={ handleChange }
      fullWidth={ fullWidth }
      InputProps={ {
        endAdornment: <InputAdornment position="end">{ unit }</InputAdornment>,
      } }
    />
  );
};

export default InputNumber;
