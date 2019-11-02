import axios from "axios";

export const fetchRepository = async id => {
  const response = await axios.get(`https://api.github.com/repositories/${id}`);
  return response.data;
};

export const fetchRepositories = async data => {
  const response = await axios.get(
    "https://api.github.com/search/repositories",
    { params: data }
  );
  return response.data;
};
