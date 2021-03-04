import React from 'react';
import PropTypes from 'prop-types';

const { useState } = React;

interface Props {
  name: string,
  label: string,
}

const InputText = (props: Props) => {
  const { name, label } = props;

  const [value, setValue] = useState('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    setValue(target.value);
  };

  return (
    <label htmlFor={ name }>
      { label }
      <input
        type="text"
        name={ name }
        id={ name }
        value={ value }
        onChange={ handleChange }
      />
    </label>
  );
};

InputText.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

InputText.defaultProps = {
  name: '',
  label: '',
};

export default InputText;
