import styled from "styled-components";
import { buildGenreSearchUrl } from "../../../../utils/urlUtils";

const DropdownContainer = styled.div`
  position: absolute;
  top: 19px;
  right: 20px;
  display: inline-block;

  > div {
    display: none;
  }

  &:focus-within > div {
    display: block;
  }
`;

const GenreDropdownButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: solid;
  border-color: black;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  width: 160px;

  &:hover,
  &:focus {
    background-color: red;
  }
`;

const GenreDropdownOptionsContainer = styled.div`
  position: absolute;
  background-color: #333;
  margin-left: 3px;
  min-width: 154px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-height: 500px;

  a {
    color: white;
    font-family: Arial;
    padding: 10px 12px;
    text-decoration: none;
    display: block;
  }

  a:hover {
    background-color: #444;
  }
`;

interface GenreDropdownProps {
  genreList: string[] | undefined;
}
export default function GenreDropdown({ genreList }: GenreDropdownProps) {
  return (
    <>
      {genreList && (
        <DropdownContainer id="dropdownContainer">
          <GenreDropdownButton
            onClick={() => {
              document.getElementById("dropdownContainer")?.focus();
            }}
          >
            Genre Search
          </GenreDropdownButton>
          <GenreDropdownOptionsContainer>
            {genreList.map((genre) => (
              <a
                href={buildGenreSearchUrl(genre)}
                key={genre}
              >
                {genre}
              </a>
            ))}
          </GenreDropdownOptionsContainer>
        </DropdownContainer>
      )}
    </>
  );
}
