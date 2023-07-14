import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getToken } from '../../services/auth';

import NavBar from '../../components/NavBar';
import Load from '../../components/Load';
import Abiliity from './components/Abiliity';
import ButtonContained from '../../components/ButtonContained';
import ButtonPagination from '../../components/ButtonPagination';

import './styles.css';

import { SkillsByPageFetch } from '../../api/services/SkillAPI';

export default function Home() {
  const [skills, setSkills] = useState([]);
  const [page, setPage] = useState(1);
  const [countPages, setCountPages] = useState(1);
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
        setCountPages(countTotalPages);
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

  return (
    <>
      <NavBar navigation={history} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <ButtonContained
            text="Criar habilidade"
            onAction={() => history.push('/skills/create')}
          />
          {errorMessage && <p className="form__message form__message--error">{errorMessage}</p>}
          {skills.map((skillLoop) => (
            <Abiliity
              abiliityParam={skillLoop}
              onEdit={() => history.push(`/skills/${skillLoop.id}/update`)}
              onHistoric={() => history.push(`/skills/${skillLoop.id}/statistic`)}
            />
          ))}
          <ButtonPagination
            currentPage={page}
            totalPages={countPages}
            onChangeCurrentPage={(updatedCurrentPage) => {
              setPage(updatedCurrentPage);
              getSkillsByPage(updatedCurrentPage);
            }}
          />
        </div>
      </div>
    </>
  );
}
