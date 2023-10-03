import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ContainerUpper from "../../components/ContainerUpper";
import ContainerForm from "../../components/ContainerForm";
import MessageContainer from "../../components/MessageContainer";
import SkillItems from "./components/SkillItems";
import ButtonContained from "../../components/ButtonContained";
import ButtonPagination from "../../components/ButtonPagination";

import { useSkillsByPageQuery } from "../../services/skill/api";

const Home = (): JSX.Element => {
  const [page, setPage] = useState(1);

  const { data: skills, isLoading } = useSkillsByPageQuery(page);

  const navigate = useNavigate();

  return (
    <ContainerUpper isRefreshing={isLoading}>
      <ContainerForm heading="" subtitle="">
        <ButtonContained
          text="Criar habilidade"
          onAction={() => {
            navigate("/skills/create", { replace: true });
          }}
        />
        {skills === undefined || skills.lengh === 0 ? (
          <MessageContainer message="Não há registros de habilidades" />
        ) : null}
        <SkillItems itemsSkill={skills === undefined ? [] : skills.results} />
        <ButtonPagination
          currentPage={page}
          totalPages={skills === undefined ? 0 : skills.pages}
          onUpdatePage={(updatedPage) => {
            setPage(updatedPage);
          }}
        />
      </ContainerForm>
    </ContainerUpper>
  );
};

export default Home;
