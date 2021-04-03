import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface Props {
  name?: string;
  label?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  color?: 'default' | 'primary' | 'secondary';
  defaultValue?: boolean;
  stateUpdater: (...params: any[]) => void;
}

const InputCheckbox = (props: Props) => {
  const name = props.name ? props.name : '';
  const label = props.label ? props.label : '';
  const labelPlacement = props.labelPlacement ? props.labelPlacement : 'end';
  const color = props.color ? props.color : 'primary';
  const { stateUpdater } = props;

  const [checked, setChecked] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    setChecked(target.checked);
  };

  useEffect(() => {
    if (props.defaultValue) setChecked(props.defaultValue);
  }, []);

  useEffect(() => {
    stateUpdater(checked);
  }, [checked]);

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
