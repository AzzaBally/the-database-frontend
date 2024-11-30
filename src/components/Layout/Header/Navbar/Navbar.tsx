import styled from "styled-components";
import { cookieConfiguration, mediaTypes } from "../../../../constants/objectConstants";
import { authenticatedFetch } from "../../../../utils/fetchUtils";
import { logoutEndpoint } from "../../../../constants/endpointConstants";
import Cookies from "js-cookie";

const NavbarContainer = styled.div`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #222;
  }
`;

const ListItem = styled.li`
  float: left;
`;

interface LinkItemProps {
  $focus_background_color?: string;
}

const LinkItem = styled.a<LinkItemProps>`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.$focus_background_color ? props.$focus_background_color : "#333"};
  }
`;

const ExpandableListItem = styled.li`
  float: left;
  &:hover > div:first-of-type,
  &:focus > div:first-of-type {
    display: block;
  }

  &:hover > a:first-of-type,
  &:focus > a:first-of-type {
    background-color: red;
  }
`;

const ChildLink = styled.a`
  display: block;
  color: white;
  background-color: #333;
  text-align: left;
  padding: 14px 16px;
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: #444;
  }
`;

const ExpandableContentContainer = styled.div`
  display: none;
  position: absolute;
  background-color: #333;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

interface NavbarProps {
  mediaType: string | undefined;
  isAuthenticated: boolean;
}

export default function Navbar({ mediaType, isAuthenticated }: NavbarProps) {
  return (
    <>
      <div>
        <hr />
        <NavbarContainer>
          <ul>
            <ExpandableListItem>
              <LinkItem
                onClick={(e) => e.preventDefault()}
                $focus_background_color="red"
              >
                Home Page
              </LinkItem>
              <ExpandableContentContainer>
                <ChildLink href="/the-database-frontend/#/anime/homepage">
                  Anime
                </ChildLink>
                <ChildLink href="/the-database-frontend/#/tv_series/homepage">
                  TV Series
                </ChildLink>
                <ChildLink href="/the-database-frontend/#/video_games/homepage">
                  Video Games
                </ChildLink>
              </ExpandableContentContainer>
            </ExpandableListItem>
            <ListItem>
              <LinkItem href="/the-database-frontend/#/search">Search</LinkItem>
            </ListItem>
            <ListItem>
              <LinkItem href="/the-database-frontend/#/timeline">
                Timeline
              </LinkItem>
            </ListItem>

            {mediaType && (
              <>
                <ListItem>
                  <LinkItem
                    onClick={(e) => {
                      if (window.location.href.includes("/view/random")) {
                        e.preventDefault();
                        window.location.reload();
                      }
                    }}
                    href={`/the-database-frontend/#/${mediaType}/view/random`}
                  >
                    Random {mediaTypes[mediaType]}
                  </LinkItem>
                </ListItem>
                <ListItem>
                  <LinkItem href={`/the-database-frontend/#/${mediaType}/add`}>
                    Add {mediaTypes[mediaType]}
                  </LinkItem>
                </ListItem>
              </>
            )}
            <ListItem>
              <LinkItem href="https://myanimelist.net/" target="_blank">
                MyAnimeList
              </LinkItem>
            </ListItem>
            <ListItem>
              <LinkItem href="https://anichart.net/" target="_blank">
                Anichart
              </LinkItem>
            </ListItem>
            {isAuthenticated && (
              <ExpandableListItem>
                <LinkItem
                  onClick={(e) => e.preventDefault()}
                  $focus_background_color="red"
                >
                  Account
                </LinkItem>
                <ExpandableContentContainer>
                  <ChildLink
                    onClick={(e) => {
                      e.preventDefault();
                      authenticatedFetch(logoutEndpoint, "POST", () => {
                        Cookies.remove(cookieConfiguration.name, cookieConfiguration.properties);
                        window.location.href = "/the-database-frontend/#/login";
                      });
                    }}
                  >
                    Logout
                  </ChildLink>
                </ExpandableContentContainer>
              </ExpandableListItem>
            )}
          </ul>
        </NavbarContainer>
        <hr />
      </div>
    </>
  );
}
