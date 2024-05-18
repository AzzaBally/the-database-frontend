import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  homepageEndpoint,
  imageEndpoint,
} from "../../constants/endpointConstants";
import { mediaTypes } from "../../constants/objectConstants";
import { authenticatedFetch } from "../../utils/fetchUtils";
import { GridDisplayImage } from "../GridDisplay/GridDisplayImage";
import { GridDisplayContainer } from "../GridDisplay/GridDisplayContainer";
import { GridDisplayTotalText } from "../GridDisplay/GridDisplayTotalText";
import Layout from "../Layout/Layout";
import { PageTitle } from "../PageTitle";

export default function Homepage() {
  const { mediaType = "anime" } = useParams();

  const [homepageResponse, setHomepageResponse] = useState<
    undefined | Record<string, any>
  >(undefined);

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
            <GridDisplayContainer>
              {homepageResponse.mediaItems.map(
                (mediaItem: Record<string, any>) => (
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
                )
              )}
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
