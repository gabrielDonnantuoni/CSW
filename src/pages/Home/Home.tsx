import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
// import PropTypes from 'prop-types';

// interface Props {

// }

const Home = () => (
  <main className="home">
    <h1>Projetos</h1>
    <h3>Você ainda não iniciou nenhum projeto</h3>
    <Link to="/new-project">Adicionar projeto</Link>
  </main>
);
// };

// Home.propTypes = {

// };

export default Home;
