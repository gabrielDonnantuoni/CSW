import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createAction } from '@reduxjs/toolkit';
import { toNumericValue, formatInputNumber } from '../../services/math/numberAndText';
import { useAppDispatch } from '../../hooks';

const { useState, useEffect } = React;

interface Props {
  name?: string;
  language?: string;
  unit?: string;
  label?: string;
  defaultValue?: string;
  action: ReturnType<typeof createAction>;
  shouldReset: boolean,
  actionParams?: any[],
}

const InputNumber = (props: Props) => {
  const name = props.name ? props.name : '';
  const language = props.language ? props.language : 'pt-br';
  const unit = props.unit ? props.unit : '';
  const label = props.label ? props.label : '';
  const defaultValue = props.defaultValue ? props.defaultValue : '';
  const actionParams = props.actionParams ? props.actionParams : [];
  const { action, shouldReset } = props;

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(action(numericValue, ...actionParams));
  }, [numericValue]);

  return (
    <TextField
      label={ label }
      id={ name }
      name={ name }
      value={ textValue }
      onChange={ handleChange }
      InputProps={ {
        endAdornment: <InputAdornment position="end">{ unit }</InputAdornment>,
      } }
    />
  );
};

export default InputNumber;
