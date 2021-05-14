import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

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

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
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
    <FormControl>
      <InputLabel htmlFor={ name }>{ label }</InputLabel>
      <NativeSelect
        fullWidth={ fullWidth }
        value={ selectValue }
        onChange={ handleChange }
        inputProps={ {
          name,
          id: name,
        } }
      >
        { options.map((opt) => (
          <option key={ opt.value } value={ opt.value }>{ opt.label }</option>
        )) }
      </NativeSelect>
    </FormControl>
  );
};

export default InputSelect;
