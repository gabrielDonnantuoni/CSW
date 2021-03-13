import React, { useState, useEffect } from 'react';
import { createAction } from '@reduxjs/toolkit';
import TextField from '@material-ui/core/TextField';

import { useAppDispatch } from '../../hooks';

interface Props {
  name?: string;
  label?: string;
  defaultValue?: string;
  action: ReturnType<typeof createAction>;
  shouldReset: boolean;
  actionParams?: any[];
}

const InputText = (props: Props) => {
  const name = props.name ? props.name : '';
  const label = props.label ? props.label : '';
  const actionParams = props.actionParams ? props.actionParams : [];
  const { action, shouldReset } = props;

  const dispatch = useAppDispatch();

  const [textValue, setTextValue] = useState('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = evt;
    setTextValue(value);
  };

  useEffect(() => {
    if (props.defaultValue) setTextValue(props.defaultValue);
  }, []);

  useEffect(() => {
    dispatch(action(textValue, ...actionParams));
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
    />
  );
};

export default InputText;
