import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

interface Props {
  name?: string;
  label?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  prefix?: string;
  stateUpdater: (newState: string) => void;
  shouldReset: boolean;
}

const InputText = (props: Props) => {
  const name = props.name ? props.name : '';
  const label = props.label ? props.label : '';
  const prefix = props.prefix ? props.prefix : '';
  const fullWidth = props.fullWidth ? props.fullWidth : false;
  const { stateUpdater, shouldReset } = props;

  const [textValue, setTextValue] = useState('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = evt;
    setTextValue(value);
  };

  useEffect(() => {
    if (props.defaultValue) setTextValue(props.defaultValue);
  }, []);

  useEffect(() => {
    stateUpdater(textValue);
  }, [textValue]);

  useEffect(() => {
    if (shouldReset) setTextValue('');
  }, [shouldReset]);

  return (
    <TextField
      label={ label }
      id={ name }
      name={ name }
      value={ textValue }
      onChange={ handleChange }
      fullWidth={ fullWidth }
      InputProps={ {
        startAdornment: <InputAdornment position="start">{ prefix }</InputAdornment>,
      } }
    />
  );
};

export default InputText;
