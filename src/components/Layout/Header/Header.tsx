import styled from "styled-components";
import GenreDropdown from "./Dropdown/GenreDropDown/GenreDropdown";
import Navbar from "./Navbar/Navbar";
import RatingDropdown from "./Dropdown/RatingDropDown/RatingDropdown";

interface HeaderProps {
  mediaType: string | undefined;
  genreList: string[] | undefined;
  isAuthenticated: boolean;
}

const StyledDiv = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
`;

const StyledHeader = styled.h1`
  display: inline-block;
  margin: 4px;
`;

export default function Header({
  mediaType,
  genreList,
  isAuthenticated,
}: HeaderProps) {
  return (
    <>
      <StyledDiv>
        <StyledHeader>The Database</StyledHeader>
        {mediaType && mediaType === "anime" && (
          <>
            <GenreDropdown genreList={genreList} />
            <RatingDropdown mediaType={mediaType} />
          </>
        )}
      </StyledDiv>
      <Navbar mediaType={mediaType} isAuthenticated={isAuthenticated} />
    </>
  );
}
