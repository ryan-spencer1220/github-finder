import { createContext, useReducer, useState } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = "https://api.github.com";

export const GithubProvider = ({ children }) => {
  const initalState = {
    users: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(githubReducer, initalState);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([true]);

  const fetchUsers = async () => {
    const response = await fetch(`https://api.github.com/users`);

    const data = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
