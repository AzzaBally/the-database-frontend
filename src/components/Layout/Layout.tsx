import Cookies from "js-cookie";
import styled from "styled-components";
import AuthenticationCheck from "./AuthenticationCheck/AuthenticationCheck";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const LayoutContainer = styled("div")`
  padding-left: 20px;
  padding-right: 20px;

  div {
    font-family: Arial;
  }
`;

const Main = styled("main")`
  display: block;
  padding-top: 20px;
  padding-bottom: 20px;

  @media only screen and (min-width: 641px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

const WidthContainer = styled("div")`
  max-width: 960px;
  margin: 0 15px;

  @media only screen and (min-width: 641px) {
    margin: 0 30px;
  }

  @media only screen and (min-width: 1020px) {
    margin: 0 auto;
  }
`;

interface LayoutProps {
  isLoginPage?: boolean;
  children: React.ReactNode;
}

export default function Layout({ isLoginPage, children }: LayoutProps) {
  let isAuthenticated = Cookies.get("djangoAuth");

  return (
    <LayoutContainer>
      <Header
        genreList={[{ displayName: "a" }, { displayName: "b" }]}
        isAuthenticated={!!isAuthenticated}
      />
      <Main>
        <WidthContainer>
          <AuthenticationCheck isAuthenticated={!!isAuthenticated} isLoginPage={isLoginPage}>
            {children}
          </AuthenticationCheck>
        </WidthContainer>
      </Main>
      <Footer />
    </LayoutContainer>
  );
}
