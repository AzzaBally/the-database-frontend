import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  homepageEndpoint,
  imageEndpoint,
} from "../../constants/endpointConstants";
import { mediaTypes } from "../../constants/objectConstants";
import { authenticatedFetch } from "../../utils/fetchUtils";
import { GridDisplayContainer } from "../GridDisplay/GridDisplayContainer";
import { GridDisplayImage } from "../GridDisplay/GridDisplayImage";
import { GridDisplayTotalText } from "../GridDisplay/GridDisplayTotalText";
import Layout from "../Layout/Layout";
import { PageTitle } from "../PageTitle";
import { Select } from "../Select";
import { LabelText } from "../LabelText";

const StyledDiv = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const StyledText = styled(LabelText)`
  display: inline-block;
  margin: 0;
  margin-right: 10px;
`;

export default function Homepage() {
  const { mediaType = "anime" } = useParams();

  const [homepageResponse, setHomepageResponse] = useState<
    undefined | Record<string, any>
  >(undefined);

  const [orderBy, setOrderBy] = useState("random");

  useEffect(() => {
    setHomepageResponse(undefined);
    if (mediaType && Object.keys(mediaTypes).includes(mediaType)) {
      const fetchMediaItems = async () => {
        await authenticatedFetch(
          homepageEndpoint.replace("{{MEDIA_TYPE}}", mediaType),
          "GET",
          (responseData) => setHomepageResponse(responseData)
        );
      };
      fetchMediaItems();
    }
  }, [mediaType]);

  return (
    <Layout mediaType={mediaType} genreList={homepageResponse?.genreList}>
      <div>
        {homepageResponse?.mediaItems && (
          <>
            <PageTitle>{mediaTypes[mediaType] + " Homepage"}</PageTitle>
            <StyledDiv>
              <StyledText>Order by:</StyledText>
              <Select
                name="orderBy"
                id="orderBy"
                value={orderBy}
                onChange={(e) => {
                  setOrderBy(e.target.value);
                }}
              >
                <option value="random">Random</option>
                <option value="watchDate">Watch Date</option>
                <option value="timesWatched">Times Watched</option>
                {mediaType === "anime" && (
                  <option value="rating">Rating</option>
                )}
              </Select>
            </StyledDiv>
            <GridDisplayContainer>
              {homepageResponse.mediaItems
                .slice()
                .sort((a: Record<string, any>, b: Record<string, any>) => {
                  if (orderBy === "random") {
                    return Math.random() - 0.5;
                  } else if (orderBy === "rating") {
                    return b.rating - a.rating;
                  } else if (orderBy === "timesWatched") {
                    return b.timesWatched - a.timesWatched;
                  } else {
                    return 0;
                  }
                })
                .map((mediaItem: Record<string, any>) => (
                  <a
                    href={`/the-database-frontend/#/${mediaType}/view/${mediaItem.id}`}
                    key={mediaItem.id}
                  >
                    <GridDisplayImage
                      src={imageEndpoint.replace(
                        "{{IMAGE_LOCATION}}",
                        mediaItem.image
                      )}
                    />
                  </a>
                ))}
            </GridDisplayContainer>
            <GridDisplayTotalText>
              {mediaTypes[mediaType] +
                " Count: " +
                homepageResponse.mediaItems.length}
            </GridDisplayTotalText>
          </>
        )}

        {!homepageResponse && (
          <strong>Attempting to fetch homepage results.</strong>
        )}
      </div>
    </Layout>
  );
}
