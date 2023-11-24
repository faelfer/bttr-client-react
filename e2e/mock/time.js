module.exports = {
  async timesByDateSucessMock(manipulePage, timesFake) {
    await manipulePage.route("*/**/times/times_by_date", async (route) => {
      const json = { times: timesFake };
      await route.fulfill({ json });
    });
  },
  async timesByPageSucessMock(manipulePage, timesFake) {
    await manipulePage.route(
      "*/**/times/times_by_page?page=1",
      async (route) => {
        const json = {
          count: timesFake.length,
          next: "http://localhost:8000/times/times_by_page?page=2",
          previous: null,
          results: timesFake,
        };
        await route.fulfill({ json });
      },
    );
  },
  async timeByIdSucessMock(manipulePage, timeFake) {
    await manipulePage.route(
      `*/**/times/time_by_id/${timeFake.id}`,
      async (route) => {
        const json = { time: timeFake };
        await route.fulfill({ json });
      },
    );
  },
  async createTimeSucessMock(manipulePage) {
    await manipulePage.route("*/**/times/create_time", async (route) => {
      const json = {
        message: "tempo foi criado com sucesso.",
      };
      await route.fulfill({ json });
    });
  },
  async updateTimeByIdSucessMock(manipulePage, timeIdFake) {
    await manipulePage.route(
      `*/**/times/update_time_by_id/${timeIdFake}`,
      async (route) => {
        const json = {
          message: "tempo alterado com sucesso.",
        };
        await route.fulfill({ json });
      },
    );
  },
  async deleteTimeByIdSucessMock(manipulePage, timeIdFake) {
    await manipulePage.route(
      `*/**/times/delete_time_by_id/${timeIdFake}`,
      async (route) => {
        const json = {
          message: "tempo excluido com sucesso.",
        };
        await route.fulfill({ json });
      },
    );
  },
};
