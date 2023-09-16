import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import SkillItems from "./components/SkillItems";
import ButtonContained from "../../components/ButtonContained";
import ButtonPagination from "../../components/ButtonPagination";

import "./styles.css";

import { useSkillsByPageQuery } from "../../services/skill/api";

export default function Home() {
  const [page, setPage] = useState(1);

  const { data: skills, isLoading } = useSkillsByPageQuery(page);

  const navigate = useNavigate();
  const amountItensByPage = 5;

  return (
    <>
      <NavBar navigation={navigate} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <ButtonContained
            text="Criar habilidade"
            onAction={() => navigate("/skills/create", { replace: true })}
          />
          <SkillItems
            messageNoItem="Não há registros de habilidades relacionadas ao seu cadastro."
            countItems={!skills?.results ? 0 : skills.results.length}
            itemsSkill={!skills?.results ? [] : skills.results}
          />
          <ButtonPagination
            currentPage={page}
            totalPages={
              !skills?.results ? 0 : Math.ceil(skills.count / amountItensByPage)
            }
            onChangeCurrentPage={(updatedPage) => setPage(updatedPage)}
          />
        </div>
      </div>
    </>
  );
}
