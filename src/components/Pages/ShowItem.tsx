import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  imageEndpoint,
  showItemEndpoint,
} from "../../constants/endpointConstants";
import { mediaTypes } from "../../constants/objectConstants";
import { authenticatedFetch } from "../../utils/fetchUtils";
import { getDayWithSuffix } from "../../utils/formattingUtils";
import { buildGenreSearchUrl } from "../../utils/urlUtils";
import { Column, ColumnContainer } from "../Column";
import Layout from "../Layout/Layout";
import { Link } from "../Link";
import { PageTitle } from "../PageTitle";

const StyledImage = styled.img`
  border: solid;
  width: 225px;
  height: 318px;
`;

const StyledColumnContainer = styled(ColumnContainer)`
  margin: 25px;
`;

const StyledWatchDatesColumnContainer = styled(ColumnContainer)`
  max-width: 280px;
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: right;
`;

export default function ShowItem() {
  const { mediaType, id } = useParams();

  const [showItemResponse, setShowItemResponse] = useState<
    undefined | Record<string, any>
  >(undefined);

  useEffect(() => {
    if (mediaType && Object.keys(mediaTypes).includes(mediaType) && id) {
      const fetchMediaItems = async () => {
        await authenticatedFetch(
          showItemEndpoint
            .replace("{{MEDIA_TYPE}}", mediaType)
            .replace("{{MEDIA_ID}}", id),
          "GET",
          (responseData) => setShowItemResponse(responseData)
        );
      };
      fetchMediaItems();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Layout
      mediaType={showItemResponse?.mediaData.mediaType}
      genreList={showItemResponse?.genreList}
    >
      <div>
        {showItemResponse?.mediaData && (
          <ColumnContainer>
            <Column $flex="25%" $minWidth="250px">
              <StyledImage
                src={imageEndpoint.replace(
                  "{{IMAGE_LOCATION}}",
                  showItemResponse.mediaData.image
                )}
              />
            </Column>
            <Column $flex="75%">
              <PageTitle>{showItemResponse.mediaData.name}</PageTitle>
              <hr />
              <StyledColumnContainer>
                <Column $flex="90%">
                  {showItemResponse.mediaData.genres && (
                    <>
                      <span>Genres: </span>
                      {showItemResponse.mediaData.genres
                        .split("/")
                        .map(
                          (genre: string, index: number, array: string[]) => (
                            <span key={`itemGenre${genre}`}>
                              <Link href={buildGenreSearchUrl(genre)}>
                                {genre}
                              </Link>
                              {index !== array.length - 1 && <>, </>}
                            </span>
                          )
                        )}
                    </>
                  )}
                  {showItemResponse.mediaData.rating && (
                    <p>Rating: {showItemResponse.mediaData.rating}</p>
                  )}
                  {showItemResponse.mediaData.watchDates && (
                    <>
                      <p>Watch history:</p>
                      <ul>
                        {showItemResponse.mediaData.watchDates.map(
                          (watchDate: Record<string, string>) => (
                            <li key={watchDate.watchDate}>
                              <StyledWatchDatesColumnContainer>
                                <Column $flex="50%">
                                  <b>
                                    {`${new Date(
                                      watchDate.watchDate
                                    ).toLocaleString("default", {
                                      month: "short",
                                    })}. ${getDayWithSuffix(
                                      new Date(watchDate.watchDate).getDate()
                                    )} ${new Date(
                                      watchDate.watchDate
                                    ).getFullYear()}`}
                                  </b>
                                </Column>
                                <Column $flex="50%">
                                  {watchDate.watchDate}
                                </Column>
                              </StyledWatchDatesColumnContainer>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}
                  {showItemResponse.mediaData.infoLink && (
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={showItemResponse.mediaData.infoLink}
                    >
                      More info
                    </Link>
                  )}
                </Column>
                <Column $flex="10%">
                  <StyledLink
                    href={`/the-database-frontend/#/${showItemResponse.mediaData.mediaType}/update/${showItemResponse.mediaData.id}`}
                  >
                    Update
                  </StyledLink>
                </Column>
              </StyledColumnContainer>
            </Column>
            {/* <PageTitle>{mediaTypes[mediaType] + " Homepage"}</PageTitle> */}
          </ColumnContainer>
        )}
        {!showItemResponse && (
          <strong>Attempting to fetch media item results.</strong>
        )}
      </div>
    </Layout>
  );
}
