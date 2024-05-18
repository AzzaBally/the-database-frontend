import styled from "styled-components";
import { mediaTypes } from "../../../../constants/objectConstants";

const NavbarContainer = styled.div`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #222;
  }
`;

interface LinkItemProps {
  focus_background_color?: string;
}

interface ExpandableListItemProps {
  float?: string;
  focus_background_color?: string;
}

interface ChildLinkProps extends LinkItemProps {
  background_color?: string;
}

const ListItem = styled.li`
  float: left;
`;

const LinkItem = styled.a<LinkItemProps>`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.focus_background_color ? props.focus_background_color : "#333"};
  }
`;

const ExpandableListItem = styled.li<ExpandableListItemProps>`
  float: ${(props) => (props.float ? props.float : "left")};
  &:hover > div:first-of-type,
  &:focus > div:first-of-type {
    display: block;
  }

  &:hover > a:first-of-type,
  &:focus > a:first-of-type {
    background-color: ${(props) =>
      props.focus_background_color ? props.focus_background_color : "red"};
  }
`;

const ChildLink = styled.a<ChildLinkProps>`
  display: block;
  color: white;
  background-color: ${(props) =>
    props.background_color ? props.background_color : "#333"};
  text-align: left;
  padding: 14px 16px;
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.focus_background_color ? props.focus_background_color : "#444"};
  }
`;

const ExpandableLinkItem = styled.a<LinkItemProps>`
  display: block;
  color: white;
  background-color: #333;
  text-align: left;
  padding: 14px 16px;
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.focus_background_color ? props.focus_background_color : "#333"};
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

const ChildExpandableContentContainer = styled.div`
  display: none;
  position: absolute;
  right: -60px;
  bottom: -184px;
  background-color: #444;
  min-width: 60px;
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
                focus_background_color="red"
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
            {mediaType && mediaType === "anime" && (
              <ExpandableListItem>
                <LinkItem
                  onClick={(e) => e.preventDefault()}
                  focus_background_color="red"
                >
                  Search
                </LinkItem>
                <ExpandableContentContainer>
                  <ChildLink href="{% url 'personaldb:search' 'name' %}">
                    Name
                  </ChildLink>
                  <ChildLink href="{% url 'personaldb:search' 'genre' %}">
                    Genre
                  </ChildLink>
                  <ul>
                    <ExpandableListItem
                      float="unset"
                      focus_background_color="#444"
                    >
                      <ExpandableLinkItem onClick={(e) => e.preventDefault()}>
                        Rating
                      </ExpandableLinkItem>
                      <ChildExpandableContentContainer>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <ChildLink
                            href={`{% url 'personaldb:rating_search' '${rating}' %}`}
                            background_color="#444"
                            focus_background_color="#555"
                            key={rating}
                          >
                            {rating}
                          </ChildLink>
                        ))}
                      </ChildExpandableContentContainer>
                    </ExpandableListItem>
                  </ul>
                </ExpandableContentContainer>
              </ExpandableListItem>
            )}
            <ListItem>
              <LinkItem href="/the-database-frontend/#/timeline">
                Timeline
              </LinkItem>
            </ListItem>

            {mediaType && (
              <>
                <ListItem>
                  <LinkItem
                    href={`/the-database-frontend/#/${mediaType}/view/random`}
                  >
                    Random {mediaTypes[mediaType]}
                  </LinkItem>
                </ListItem>
                <ListItem>
                  <LinkItem
                    href={`/the-database-frontend/#/${mediaType}/view/random`}
                  >
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

            <ExpandableListItem>
              <LinkItem
                onClick={(e) => e.preventDefault()}
                focus_background_color="red"
              >
                Account
              </LinkItem>
              <ExpandableContentContainer>
                {isAuthenticated && (
                  <ChildLink href="{% url 'personaldb:logout' %}">
                    Logout
                  </ChildLink>
                )}
                {!isAuthenticated && (
                  <ChildLink href="{% url 'personaldb:login' %}">
                    Login
                  </ChildLink>
                )}
              </ExpandableContentContainer>
            </ExpandableListItem>
          </ul>
        </NavbarContainer>
        <hr />
      </div>
    </>
  );
}
