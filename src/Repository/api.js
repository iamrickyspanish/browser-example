import axios from "axios";

const baseUrl = "https://api.github.com/repositories";

export const fetchRepository = async id => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const fetchRepositories = async data => {
  const response = await axios.get(baseUrl, { params: data });
  return response.data;
};
