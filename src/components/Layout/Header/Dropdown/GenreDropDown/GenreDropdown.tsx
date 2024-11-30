import { buildGenreSearchUrl } from "../../../../../utils/urlUtils";
import { DropdownButton } from "../DropdownButton";
import { DropdownContainer } from "../DropdownContainer";
import { DropdownOptionsContainer } from "../DropdownOptionsContainer";

interface GenreDropdownProps {
  genreList: string[] | undefined;
}
export default function GenreDropdown({ genreList }: GenreDropdownProps) {
  return (
    <>
      {genreList && (
        <DropdownContainer id="genreDropdownContainer">
          <DropdownButton
            onClick={() => {
              document.getElementById("genreDropdownContainer")?.focus();
            }}
          >
            Genre Search
          </DropdownButton>
          <DropdownOptionsContainer>
            {genreList.map((genre) => (
              <a
                href={buildGenreSearchUrl(genre)}
                key={genre}
              >
                {genre}
              </a>
            ))}
          </DropdownOptionsContainer>
        </DropdownContainer>
      )}
    </>
  );
}
