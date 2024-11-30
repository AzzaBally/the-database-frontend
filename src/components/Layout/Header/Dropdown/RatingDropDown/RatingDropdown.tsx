import styled from "styled-components";
import { buildRatingSearchUrl } from "../../../../../utils/urlUtils";
import { DropdownContainer } from "../DropdownContainer";
import { DropdownButton } from "../DropdownButton";
import { DropdownOptionsContainer } from "../DropdownOptionsContainer";

interface RatingDropdownProps {
  mediaType: string | undefined;
}

const StyledDropdownContainer = styled(DropdownContainer)`
  margin-right: 10px;
`;

const StyledDropdownButton = styled(DropdownButton)`
  max-width: 140px;
`;

const StyledDropdownOptionsContainer = styled(DropdownOptionsContainer)`
  min-width: 134px;
`;

export default function GenreDropdown({ mediaType }: RatingDropdownProps) {
  return (
    <StyledDropdownContainer id="ratingDropdownContainer">
      <StyledDropdownButton
        onClick={() => {
          document.getElementById("ratingDropdownContainer")?.focus();
        }}
      >
        Rating Search
      </StyledDropdownButton>
      <StyledDropdownOptionsContainer>
        {[1, 2, 3, 4, 5].map((rating) => (
          <a href={buildRatingSearchUrl(rating)} key={"search-" + rating}>
            {rating}
          </a>
        ))}
      </StyledDropdownOptionsContainer>
    </StyledDropdownContainer>
  );
}
