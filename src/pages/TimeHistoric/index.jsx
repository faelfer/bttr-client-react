import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getToken } from '../../services/auth';

import NavBar from '../../components/NavBar';
import Load from '../../components/Load';
import Time from './components/Time';
import ButtonContained from '../../components/ButtonContained';
import ButtonPagination from '../../components/ButtonPagination';

import './styles.css';

import { TimesByPageFetch } from '../../api/services/TimeAPI';

export default function TimeHistoric() {
  const [times, setTime] = useState([]);
  const [page, setPage] = useState(1);
  const [countPages, setCountPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = getToken();
  const navigate = useNavigate();
  const amountItensByPage = 10;

  async function getSkillsByPage(goToPage) {
    setIsLoading(true);

    try {
      const resultSkills = await TimesByPageFetch(token, goToPage);
      console.log('getSkillsByPage | resultSkills: ', resultSkills);

      setIsLoading(false);
      if (!resultSkills.isSuccess) {
        setErrorMessage(resultSkills.message);
      } else {
        setTime(resultSkills.times);
        const countTotalPages = Math.ceil(((resultSkills.times).length) / amountItensByPage);
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
            text="Criar tempo"
            onAction={() => navigate('/times/create', { replace: true })}
          />
          {errorMessage && <p className="form__message form__message--error">{errorMessage}</p>}
          {times.map((timeLoop) => (
            <Time
              time={timeLoop}
              onUpdate={() => navigate(`/times/${timeLoop.id}/update`, { replace: true })}
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
