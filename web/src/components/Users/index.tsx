import React, { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";

// import { Container } from './styles';

interface IUser {
  id: number;
  email: string;
}

const GET_USERS = gql`
  query {
    getUsers {
      id
      email
    }
  }
`;

const Users: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  const users = useMemo<IUser[]>(() => data?.getUsers || [], [data]);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error on loading data</h1>;

  return (
    <div>
      <h1>Users</h1>
      {users?.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </div>
  );
};

export default Users;
