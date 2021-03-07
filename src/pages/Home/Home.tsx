import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Home.css';
// import PropTypes from 'prop-types';

// interface Props {

// }

const Home = () => {
  const history = useHistory();
  const toNewProject = () => {
    history.push('/new-project');
  };

  return (
    <main className="home">
      <h1>Projetos</h1>
      <h3>Você ainda não iniciou nenhum projeto</h3>
      <Button type="button" onClick={ toNewProject }>Adicionar projeto</Button>
    </main>
  );
};
// };

// Home.propTypes = {

// };

export default Home;
