import httpService from "./http.service";

const todosEndPoint = "todos/";

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndPoint, {
      params: {
        _page: 1,
        _limit: 4,
      },
    });
    return data;
  },

  add: async () => {
    const { data } = await httpService.post(todosEndPoint, {
      title: "Новая задача",
      completed: false,
    });
    return data;
  },
};
export default todosService;
