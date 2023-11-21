module.exports = {
  async signUpSucessMock(manipulePage) {
    await manipulePage.route("*/**/api/users/sign_up", async (route) => {
      const json = {
        message: "usuário foi criado com sucesso.",
      };
      await route.fulfill({ json });
    });
  },
  async signUpAlreadyExistUsernameMock(manipulePage) {
    await manipulePage.route("*/**/api/users/sign_up", async (route) => {
      const json = {
        message: "nome de usuário já existente.",
      };
      await route.fulfill({ status: 409, json });
    });
  },
  async signUpAlreadyExistEmailMock(manipulePage) {
    await manipulePage.route("*/**/api/users/sign_up", async (route) => {
      const json = {
        message: "usuário com e-mail já existente.",
      };
      await route.fulfill({ status: 409, json });
    });
  },
  async signInSucessMock(manipulePage, userFake) {
    await manipulePage.route("*/**/api/users/sign_in", async (route) => {
      const json = {
        token: "60729b93-a13e-427b-a474-b1d59ea944ac",
        user: userFake,
        message: "autenticação realizada com sucesso.",
      };
      await route.fulfill({ json });
    });
  },
  async signInPasswordWrongMock(manipulePage) {
    await manipulePage.route("*/**/api/users/sign_in", async (route) => {
      const json = {
        message: "senha incorreta.",
      };
      await route.fulfill({ status: 401, json });
    });
  },
  async signInNotFoundMock(manipulePage) {
    await manipulePage.route("*/**/api/users/sign_in", async (route) => {
      const json = {
        message: "usuário não foi encontrado.",
      };
      await route.fulfill({ status: 404, json });
    });
  },
  async forgotPasswordSucessMock(manipulePage, userFake) {
    await manipulePage.route("*/**/users/forgot_password", async (route) => {
      const json = {
        message: "senha temporária enviada.",
      };
      await route.fulfill({ json });
    });
  },
  async forgotPasswordNotFoundMock(manipulePage) {
    await manipulePage.route("*/**/users/forgot_password", async (route) => {
      const json = {
        message: "usuário não foi encontrado.",
      };
      await route.fulfill({ status: 404, json });
    });
  },
  async profileSucessMock(manipulePage, userFake) {
    await manipulePage.route("*/**/users/profile", async (route) => {
      const json = { user: userFake };
      await route.fulfill({ json });
    });
  },
  async profileUpdateSucessMock(manipulePage) {
    await manipulePage.route("*/**/users/profile", async (route) => {
      const json = {
        message: "perfil alterado com sucesso.",
      };
      await route.fulfill({ json });
    });
  },
  async profileUpdateAlreadyExistEmailMock(manipulePage) {
    await manipulePage.route("*/**/users/profile", async (route) => {
      const json = {
        message: "usuário com e-mail já existente.",
      };
      await route.fulfill({ status: 409, json });
    });
  },
  async profileUpdateAlreadyExistUsernameMock(manipulePage) {
    await manipulePage.route("*/**/users/profile", async (route) => {
      const json = {
        message: "nome de usuário já existente.",
      };
      await route.fulfill({ status: 409, json });
    });
  },
  async profileDeleteSucessMock(manipulePage) {
    await manipulePage.route("*/**/users/profile", async (route) => {
      const json = {
        message: "usuário excluido com sucesso.",
      };
      await route.fulfill({ json });
    });
  },
  async redefinePasswordSucessMock(manipulePage) {
    await manipulePage.route("*/**/users/redefine_password", async (route) => {
      const json = {
        message: "senha alterada com sucesso.",
      };
      await route.fulfill({ json });
    });
  },
  async redefinePasswordWrongMock(manipulePage) {
    await manipulePage.route("*/**/users/redefine_password", async (route) => {
      const json = {
        message: "senha preenchida é incorreta.",
      };
      await route.fulfill({ status: 401, json });
    });
  },
};
