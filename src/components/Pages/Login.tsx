import Cookies from "js-cookie";
import { useState } from "react";
import styled from "styled-components";
import { loginEndpoint } from "../../constants/endpointConstants";
import { cookieConfiguration } from "../../constants/objectConstants";
import { loginValidator } from "../../constants/zodConstants";
import { Button } from "../Button";
import ErrorMessage from "../ErrorMessage";
import { LabelText } from "../LabelText";
import Layout from "../Layout/Layout";
import { PageTitle } from "../PageTitle";
import { TextInput } from "../TextInput";

const StyledButton = styled(Button)`
  margin-top: 25px;
  min-width: 10%;
  display: block;
`;

export default function ShowItem() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({
    username: undefined,
    password: undefined,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValidation = loginValidator.safeParse(loginForm);
    if (formValidation.success) {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      if (response.status === 200) {
        Cookies.set(
          cookieConfiguration.name,
          "Token " + (await response.json())?.token,
          cookieConfiguration.properties
        );
        window.location.href = "/the-database-frontend/#/anime/homepage";
      }
    } else {
      setFormErrors({ username: undefined, password: undefined });
      formValidation.error.issues.forEach((issue) =>
        setFormErrors((prevFormErrors) => {
          return { ...prevFormErrors, [issue.path.join()]: issue.message };
        })
      );
    }
  };
  return (
    <Layout pageType="login">
      <form onSubmit={onSubmit} autoComplete="off">
        <PageTitle>Login</PageTitle>
        <hr />
        <br />
        <LabelText htmlFor="usernameInput">Username</LabelText>
        <ErrorMessage errorMessage={formErrors.username} />
        <TextInput
          type="text"
          placeholder="Enter Username"
          name="usernameInput"
          $error={formErrors.username}
          onChange={(e) =>
            setLoginForm((prevLoginForm) => {
              return { ...prevLoginForm, username: e.target.value };
            })
          }
        />
        <br />
        <LabelText htmlFor="passwordInput">Password</LabelText>
        <ErrorMessage errorMessage={formErrors.password} />
        <TextInput
          type="password"
          placeholder="Enter Password"
          name="passwordInput"
          $error={formErrors.password}
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
