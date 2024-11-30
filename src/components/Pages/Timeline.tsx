import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  imageEndpoint,
  timelineEndpoint,
} from "../../constants/endpointConstants";
import { authenticatedFetch } from "../../utils/fetchUtils";
import { Button } from "../Button";
import { GridDisplayContainer } from "../GridDisplay/GridDisplayContainer";
import { GridDisplayImage } from "../GridDisplay/GridDisplayImage";
import { GridDisplayTotalText } from "../GridDisplay/GridDisplayTotalText";
import Layout from "../Layout/Layout";
import { PageTitle } from "../PageTitle";

export const StyledButton = styled(Button)`
  width: 200px;
  margin-top: 15px;
  margin-right: 10px;
`;

export default function Timeline() {
  const [timelineResponse, setTimelineResponse] = useState<
    undefined | Record<string, any>
  >(undefined);

  const [sliceIndexes, setSliceIndexes] = useState([0, 21]);

  useEffect(() => {
    const fetchMediaItems = async () => {
      await authenticatedFetch(timelineEndpoint, "GET", (responseData) =>
        setTimelineResponse(responseData)
      );
    };
    fetchMediaItems();
  }, []);

  const onClickNextEntries = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      setSliceIndexes((prevSliceIndexes) => [
        Math.max(0, prevSliceIndexes[0] + 21),
        Math.min(
          timelineResponse?.mediaItems?.length ?? 1,
          prevSliceIndexes[0] + 42
        ),
      ]);
    },
    [timelineResponse]
  );

  const onClickPrevEntries = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setSliceIndexes((prevSliceIndexes) => [
      Math.max(0, prevSliceIndexes[0] - 21),
      prevSliceIndexes[0],
    ]);
  }, []);

  const onClickAllEntries = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      setSliceIndexes([0, timelineResponse?.mediaItems?.length ?? 9999]);
    },
    [timelineResponse]
  );

  return (
    <Layout genreList={timelineResponse?.genreList}>
      <div>
        {timelineResponse?.mediaItems && (
          <>
            <PageTitle>Timeline</PageTitle>
            <GridDisplayContainer>
              {timelineResponse.mediaItems
                .slice(...sliceIndexes)
                .map((mediaItem: Record<string, any>, index: number) => (
                  <a
                    href={`/the-database-frontend/#/${mediaItem.mediaType}/view/${mediaItem.id}`}
                    key={index}
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
            {sliceIndexes[0] > 0 && (
              <StyledButton onClick={onClickPrevEntries}>
                Previous Entries Set
              </StyledButton>
            )}
            {sliceIndexes[1] < timelineResponse.mediaItems.length - 1 && (
              <StyledButton onClick={onClickNextEntries}>
                Next Entries Set
              </StyledButton>
            )}
            {(sliceIndexes[0] !== 0 ||
              sliceIndexes[1] < timelineResponse.mediaItems.length) && (
              <div>
                <StyledButton onClick={onClickAllEntries}>
                  View Full Timeline
                </StyledButton>
              </div>
            )}
            <GridDisplayTotalText>
              {"Total Timeline Entries: " + timelineResponse.mediaItems.length}
            </GridDisplayTotalText>
          </>
        )}

        {!timelineResponse && <strong>Attempting to fetch timeline.</strong>}
      </div>
    </Layout>
  );
}
