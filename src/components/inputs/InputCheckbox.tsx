import React, { useState, useEffect } from 'react';
import { createAction } from '@reduxjs/toolkit';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useAppDispatch } from '../../hooks';

interface Props {
  name?: string;
  label?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  color?: 'default' | 'primary' | 'secondary';
  action: ReturnType<typeof createAction>;
  shouldReset: boolean;
  actionParams: any[];
}

const InputCheckbox = (props: Props) => {
  const name = props.name ? props.name : '';
  const label = props.label ? props.label : '';
  const labelPlacement = props.labelPlacement ? props.labelPlacement : 'end';
  const color = props.color ? props.color : 'primary';
  const actionParams = props.actionParams ? props.actionParams : [];
  const { action, shouldReset } = props;

  const dispatch = useAppDispatch();

  const [checked, setChecked] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    setChecked(target.checked);
  };

  useEffect(() => {
    dispatch(action(checked, ...actionParams));
  }, [checked]);

  useEffect(() => {
    if (shouldReset) setChecked(false);
  }, [shouldReset]);

  return (
    <FormControlLabel
      label={ label }
      labelPlacement={ labelPlacement }
      control={
        <Checkbox
          name={ name }
          checked={ checked }
          onChange={ handleChange }
          color={ color }
        />
      }
    />
  );
};

export default InputCheckbox;
