import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { getToken, logout } from '../../services/auth';

import NavBar from '../../components/NavBar';
import Abiliity from './components/Abiliity';
import Load from '../../components/Load';

import './styles.css';

import { SkillsByPageFetch } from '../../api/services/SkillAPI';

export default function Home() {
  const [skills, setSkills] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = getToken();
  const history = useHistory();
  const amountItensByPage = 10;

  async function getSkillsByPage(nextPage) {
    setIsLoading(true);

    try {
      const resultSkills = await SkillsByPageFetch(token, nextPage);
      console.log('getSkillsByPage | resultSkills: ', resultSkills);

      setIsLoading(false);
      if (!resultSkills.isSuccess) {
        setErrorMessage(resultSkills.message);
      } else {
        setSkills(resultSkills.skills);
        const countTotalPages = Math.ceil(((resultSkills.skills).length) / amountItensByPage);
        setTotalPages(countTotalPages);
      }
    } catch (error) {
      console.log('getSkillsByPage | error: ', error);
      setErrorMessage('No momento esse recurso está indisponível, tente novamente mais tarde.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSkillsByPage(1);
  }, [token, history]);

  function prevPage() {
    if (page === 1) return;

    const pageNumber = page - 1;

    getSkillsByPage(pageNumber);
  }

  function nextPage() {
    console.log('nextPage');
    if (page === totalPages) return;

    const pageNumber = page + 1;
    console.log('nextPage | pageNumber: ', pageNumber);
    getSkillsByPage(pageNumber);
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
        {errorMessage
          ? (
            <div className="time__content">
              <p className="form__message--error">{errorMessage}</p>
            </div>
          )
          : (
            <div className="home__content">
              <Load isShow={isLoading} />
              {skills.map((skillLoop) => (
                <Abiliity
                  abiliity={skillLoop}
                  key={skillLoop.id}
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
            <button className="pagination__button" disabled={page === totalPages} onClick={nextPage}>
              Próximo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
