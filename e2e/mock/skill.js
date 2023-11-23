module.exports = {
  async skillsFromUserSucessMock(manipulePage, skillsFake) {
    await manipulePage.route(
      "*/**/skills/skills_from_user",
      async (route) => {
        const json = { skills: skillsFake };
        await route.fulfill({ json });
      },
    );
  },
  async skillsByPageSucessMock(manipulePage, skillsFake) {
    await manipulePage.route(
      "*/**/skills/skills_by_page?page=1",
      async (route) => {
        const json = {
          count: skillsFake.length,
          next: "http://localhost:8000/skills/skills_by_page?page=2",
          previous: null,
          results: skillsFake,
        };
        await route.fulfill({ json });
      },
    );
  },
  async skillByIdSucessMock(manipulePage, skillFake) {
    await manipulePage.route(
      `*/**/skills/skill_by_id/${skillFake.id}`,
      async (route) => {
        const json = { skill: skillFake };
        await route.fulfill({ json });
      },
    );
  },
  async createSkillSucessMock(manipulePage) {
    await manipulePage.route("*/**/skills/create_skill", async (route) => {
      const json = {
        message: "habilidade foi criada com sucesso.",
      };
      await route.fulfill({ json });
    });
  },
  async createSkillAlreadyExistNameMock(manipulePage) {
    await manipulePage.route("*/**/skills/create_skill", async (route) => {
      const json = {
        message: "nome de habilidade já existente.",
      };
      await route.fulfill({ status: 409, json });
    });
  },
  async updateSkillByIdSucessMock(manipulePage, skillIdFake) {
    await manipulePage.route(
      `*/**/skills/update_skill_by_id/${skillIdFake}`,
      async (route) => {
        const json = {
          message: "habilidade alterada com sucesso.",
        };
        await route.fulfill({ json });
      },
    );
  },
  async deleteSkillByIdSucessMock(manipulePage, skillIdFake) {
    await manipulePage.route(
      `*/**/skills/delete_skill_by_id/${skillIdFake}`,
      async (route) => {
        const json = {
          message: "habilidade excluida com sucesso.",
        };
        await route.fulfill({ json });
      },
    );
  },
};
