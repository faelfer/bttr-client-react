import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import api from '../../services/api';
import { getToken, logout } from '../../services/auth';
import NavBar from '../../components/NavBar';
import Abiliity from './components/Abiliity';
import Load from '../../components/Load';

export default function Home({ history }) {
  const [abiliities, setAbiliities] = useState([]);
  const [abiliityInfo, setAbiliityInfo] = useState({});
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState('');
  const token = getToken();

  const getAbiliities = useCallback(async (pageNumber = 1) => {
    setIsLoad(true);
    try {
      const response = await api.get(`/abiliity?page=${pageNumber}`, {
        headers: { Authorization: token },
      });
      console.log('getAbiliities | response: ', response);
      const { docs, ...abiliityInfo } = response.data;
      setIsLoad(false);
      if (!response.data.status === 200) {
        setError('Houve um problema ao listar suas habilidades, tente novamente mais tarde');
      }

      setAbiliities(docs);
      setAbiliityInfo(abiliityInfo);
      setPage(pageNumber);
    } catch (error) {
      console.log('getAbiliities | error: ', error);
      if (error.message === 'Request failed with status code 401') {
        logout();
        history.push('/');
      }
      setError('Houve um problema ao listar suas habilidades, tente novamente mais tarde');
      setIsLoad(false);
    }
  }, [token, history]);

  useEffect(() => {
    getAbiliities();
  }, [token, history, getAbiliities]);

  function prevPage() {
    if (page === 1) return;

    const pageNumber = page - 1;

    getAbiliities(pageNumber);
  }

  function nextPage() {
    console.log('nextPage');
    if (page === abiliityInfo.pages) return;

    const pageNumber = page + 1;
    console.log('nextPage | pageNumber: ', pageNumber);
    getAbiliities(pageNumber);
  }

  return (
    <>
      <NavBar navigation={history} />
      <div className="content--align content--column">
        <div className="time__content">
          <div className="time__create">
            <button className="time__button" onClick={() => history.push('/abiliity')}>
              Criar habilidade
            </button>
          </div>
        </div>
        {error
          ? (
            <div className="time__content">
              <p className="form__message--error">{error}</p>
            </div>
          )
          : (
            <div className="home__content">
              <Load isShow={isLoad} />
              {abiliities.map((abiliity, key) => (
                <Abiliity
                  abiliity={abiliity}
                  key={key}
                  history={history}
                />
              ))}
            </div>
          )}
        <div className="time__content">
          <div className="home__pagination">
            <button className="pagination__button" disabled={page === 1} onClick={prevPage}>
              Anterior
            </button>
            <button className="pagination__button" disabled={page === abiliityInfo.pages} onClick={nextPage}>
              Próximo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
