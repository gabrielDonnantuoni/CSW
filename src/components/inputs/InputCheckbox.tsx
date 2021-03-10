import React from 'react';
// import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const { useState, useEffect } = React;

interface Props {
  name?: string;
  label?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  color?: 'default' | 'primary' | 'secondary';
  toState: (name: string, value: boolean) => void;
  shouldReset: boolean;
}

const InputCheckbox = (props: Props) => {
  const name = props.name ? props.name : '';
  const label = props.label ? props.label : '';
  const labelPlacement = props.labelPlacement ? props.labelPlacement : 'end';
  const color = props.color ? props.color : 'primary';
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
