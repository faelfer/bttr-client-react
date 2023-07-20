import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getToken } from '../../services/auth';

import NavBar from '../../components/NavBar';
import Load from '../../components/Load';
import SkillItem from './components/SkillItem';
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
  const navigate = useNavigate();
  const amountItensByPage = 5;

  async function getSkillsByPage(goToPage) {
    setIsLoading(true);

    try {
      const resultSkills = await SkillsByPageFetch(token, goToPage);
      console.log('getSkillsByPage | resultSkills: ', resultSkills);

      setIsLoading(false);
      if (!resultSkills.isSuccess) {
        setErrorMessage(resultSkills.message);
      } else {
        setSkills(resultSkills.skills);
        const countTotalPages = Math.ceil(resultSkills.count / amountItensByPage);
        console.log('getTimesByPage | countTotalPages: ', countTotalPages);
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
  }, [token, navigate]);

  return (
    <>
      <NavBar navigation={navigate} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <ButtonContained
            text="Criar habilidade"
            onAction={() => navigate('/skills/create', { replace: true })}
          />
          {errorMessage && <p className="form__message form__message--error">{errorMessage}</p>}
          {skills.map((skillLoop) => (
            <SkillItem
              skillProps={skillLoop}
              onUpdate={() => navigate(`/skills/${skillLoop.id}/update`, { replace: true })}
              onStatistic={() => navigate(`/skills/${skillLoop.id}/statistic`, { replace: true })}
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
