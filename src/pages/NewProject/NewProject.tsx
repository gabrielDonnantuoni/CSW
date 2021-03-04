import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import './NewProject.css';

const { useState } = React;

const NewProject = () => {
  const [value, setValue] = useState('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    setValue(target.value);
  };

  return (
    <main className="new-project">
      <input
        type="text"
        className="project-title"
        placeholder="Nome do projeto"
        value={ value }
        onChange={ handleChange }
      />
      <Link to={ `/${encodeURI(value)}` }>Iniciar projeto</Link>
    </main>
  );
};

// NewProject.propTypes = {

// };

export default NewProject;
