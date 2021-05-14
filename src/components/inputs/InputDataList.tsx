import React from 'react';
import TextField from '@material-ui/core/TextField';

const { useState, useEffect } = React;

interface Props {
  name?: string;
  label?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  stateUpdater: (newState: string) => void;
  shouldReset: boolean;
  options: { value: string, label: string }[];
}

const InputSelect = (props: Props) => {
  const name = props.name ? props.name : '';
  const label = props.label ? props.label : '';
  const fullWidth = props.fullWidth ? props.fullWidth : false;
  const { stateUpdater, shouldReset, options } = props;

  const [selectValue, setSelectValue] = useState('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(evt.target.value);
  };

  useEffect(() => {
    if (props.defaultValue) setSelectValue(props.defaultValue);
  }, []);

  useEffect(() => {
    stateUpdater(selectValue);
  }, [selectValue]);

  useEffect(() => {
    if (shouldReset) setSelectValue('');
  }, [shouldReset]);

  return (
    <>
      <TextField
        label={ label }
        id={ name }
        name={ name }
        value={ selectValue }
        onChange={ handleChange }
        fullWidth={ fullWidth }
        inputProps={ { list: `list-${name}` } }
      />
      <datalist id={ `list-${name}` }>
        { options.map((opt) => (
          <option key={ opt.value } value={ opt.value }>{ opt.label }</option>
        )) }
      </datalist>
    </>
  );
};

export default InputSelect;
