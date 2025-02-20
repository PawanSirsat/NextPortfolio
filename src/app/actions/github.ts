import axios from "axios";
import { GitHubData } from "../../../utils/type";

export const fetchGitHubData = async (
  owner: string,
  repo: string
): Promise<GitHubData> => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    const { stargazers_count, forks_count, updated_at } = response.data;
    return {
      stars: stargazers_count,
      forks: forks_count,
      lastUpdated: new Date(updated_at).toLocaleDateString(),
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
