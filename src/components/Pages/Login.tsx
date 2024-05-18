import Cookies from "js-cookie";
import { useState } from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout";
import { loginEndpoint } from "../../constants/endpointConstants";
import { Button } from "../Button";

const StyledInput = styled.input`
  display: block;
`;

const StyledButton = styled(Button)`
  margin-top: 25px;
  min-width: 10%;
  display: block;
`;

export default function ShowItem() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(loginEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    });

    if (response.status === 200) {
      Cookies.set("djangoAuth", "Token " + (await response.json())?.token);
      window.location.href = "/the-database-frontend/#/anime/homepage";
    }
  };
  return (
    <Layout pageType="login">
      <form onSubmit={onSubmit}>
        <label htmlFor="usernameInput">Username</label>
        <StyledInput
          type="text"
          placeholder="Enter Username"
          name="usernameInput"
          onChange={(e) =>
            setLoginForm((prevLoginForm) => {
              return { ...prevLoginForm, username: e.target.value };
            })
          }
        />
        <br />
        <label htmlFor="passwordInput">Password</label>
        <StyledInput
          type="password"
          placeholder="Enter Password"
          name="passwordInput"
          onChange={(e) =>
            setLoginForm((prevLoginForm) => {
              return { ...prevLoginForm, password: e.target.value };
            })
          }
        />

        <StyledButton type="submit">Login</StyledButton>
      </form>
    </Layout>
  );
}
