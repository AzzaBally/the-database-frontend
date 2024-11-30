import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  homepageEndpoint,
  imageEndpoint,
} from "../../constants/endpointConstants";
import { mediaTypes } from "../../constants/objectConstants";
import { authenticatedFetch } from "../../utils/fetchUtils";
import { Button } from "../Button";
import { GridDisplayContainer } from "../GridDisplay/GridDisplayContainer";
import { GridDisplayImage } from "../GridDisplay/GridDisplayImage";
import { GridDisplayTotalText } from "../GridDisplay/GridDisplayTotalText";
import { LabelText } from "../LabelText";
import Layout from "../Layout/Layout";
import { PageTitle } from "../PageTitle";
import { Select } from "../Select";
import { TextInput } from "../TextInput";

const StyledButton = styled(Button)`
  margin-top: 25px;
  min-width: 10%;
  display: block;
`;

export default function Search() {
  const [searchParams] = useSearchParams();
  const [searchForm, setSearchForm] = useState({
    mediaType: "anime",
    name: "",
    genres: searchParams.get("genres") ?? "",
    rating: searchParams.get("rating") ?? "",
    leastTimesWatched: 0,
    resultsOrder: "random",
  });

  const [homepageResponse, setHomepageResponse] = useState<
    undefined | Record<string, any>
  >(undefined);

  useEffect(() => {
    setHomepageResponse(undefined);
    if (
      searchForm.mediaType &&
      Object.keys(mediaTypes).includes(searchForm.mediaType)
    ) {
      const fetchMediaItems = async () => {
        await authenticatedFetch(
          homepageEndpoint.replace("{{MEDIA_TYPE}}", searchForm.mediaType),
          "GET",
          (responseData) => setHomepageResponse(responseData)
        );
      };
      fetchMediaItems();
    }
  }, [searchForm.mediaType]);

  const [searchResults, setSearchResults] = useState<
    undefined | Record<string, any>[]
  >(undefined);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredResults = homepageResponse?.mediaItems
      ?.filter((item: Record<string, any>) => {
        let animeChecks = true;
        if (searchForm.mediaType === "anime") {
          animeChecks =
            searchForm.genres
              .split("/")
              .every((genre) =>
                item.genres
                  .toLowerCase()
                  .includes(genre.toLowerCase().replace("-", " "))
              ) && item.rating.toString().includes(searchForm.rating);
        }
        return (
          animeChecks &&
          item.name.toLowerCase().includes(searchForm.name.toLowerCase()) &&
          item.timesWatched >= searchForm.leastTimesWatched
        );
      })
      .sort((a: Record<string, any>, b: Record<string, any>) => {
        if (searchForm.resultsOrder === "random") {
          return Math.random() - 0.5;
        } else if (
          searchForm.mediaType === "anime" &&
          searchForm.resultsOrder === "rating"
        ) {
          return b.rating - a.rating;
        } else if (searchForm.resultsOrder === "timesWatched") {
          return b.timesWatched - a.timesWatched;
        } else {
          return 0;
        }
      });
    setSearchResults(filteredResults);
  };

  return (
    <Layout
      mediaType={searchForm.mediaType}
      genreList={homepageResponse?.genreList}
    >
      <div>
        <form onSubmit={onSubmit} autoComplete="off">
          <PageTitle>Search</PageTitle>
          <hr />
          <br />
          <div>
            <LabelText htmlFor="mediaTypeInput">Media Type</LabelText>
            <div>
              <Select
                name="mediaTypeInput"
                id="mediaTypeInput"
                value={searchForm.mediaType}
                onChange={(e) =>
                  setSearchForm((prevSearchForm) => {
                    return { ...prevSearchForm, mediaType: e.target.value };
                  })
                }
              >
                <option value="anime">Anime</option>
                <option value="tv_series">TV Series</option>
                <option value="video_games">Video Games</option>
              </Select>
            </div>
          </div>
          <br />
          <LabelText htmlFor="nameInput">Name</LabelText>
          <TextInput
            type="text"
            placeholder="Enter Name"
            name="nameInput"
            value={searchForm.name}
            onChange={(e) =>
              setSearchForm((prevSearchForm) => {
                return { ...prevSearchForm, name: e.target.value };
              })
            }
          />
          <br />
          {searchForm?.mediaType && searchForm.mediaType === "anime" && (
            <>
              <LabelText htmlFor="genresInput">Genres</LabelText>
              <TextInput
                type="text"
                placeholder="Enter Genres"
                name="genresInput"
                value={searchForm.genres}
                onChange={(e) =>
                  setSearchForm((prevSearchForm) => {
                    return { ...prevSearchForm, genres: e.target.value };
                  })
                }
              />
              <br />
              <LabelText htmlFor="ratingInput">Rating</LabelText>
              <TextInput
                type="number"
                placeholder="Enter Rating"
                name="ratingInput"
                value={searchForm.rating}
                onChange={(e) =>
                  setSearchForm((prevSearchForm) => {
                    return { ...prevSearchForm, rating: e.target.value };
                  })
                }
              />
              <br />
            </>
          )}
          <LabelText htmlFor="leastTimesWatchedInput">
            Least Times Watched
          </LabelText>
          <TextInput
            type="number"
            placeholder="Enter Least Times Watched"
            name="leastTimesWatchedInput"
            value={searchForm.leastTimesWatched}
            onChange={(e) =>
              setSearchForm((prevSearchForm) => {
                return {
                  ...prevSearchForm,
                  leastTimesWatched: +e.target.value,
                };
              })
            }
          />
          <br />
          <div>
            <LabelText htmlFor="resultsOrderInput">Results Order</LabelText>
            <div>
              <Select
                name="resultsOrderInput"
                id="resultsOrderInput"
                value={searchForm.resultsOrder}
                onChange={(e) =>
                  setSearchForm((prevSearchForm) => {
                    return { ...prevSearchForm, resultsOrder: e.target.value };
                  })
                }
              >
                <option value="random">Random</option>
                <option value="watchDate">Watch Date</option>
                <option value="timesWatched">Times Watched</option>
                {searchForm.mediaType === "anime" && (
                  <option value="rating">Rating</option>
                )}
              </Select>
            </div>
          </div>
          <StyledButton type="submit">Search</StyledButton>
          <br />
        </form>
        {searchResults && searchResults.length > 0 && (
          <>
            <hr />
            <br />
            <PageTitle>Results</PageTitle>
            <br />
            <GridDisplayContainer>
              {searchResults.map((mediaItem: Record<string, any>) => (
                <a
                  href={`/the-database-frontend/#/${searchForm.mediaType}/view/${mediaItem.id}`}
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
              {mediaTypes[searchForm.mediaType] +
                " Count: " +
                searchResults.length}
            </GridDisplayTotalText>
          </>
        )}
        {searchResults && searchResults.length === 0 && (
          <>
            <hr />
            <br />
            <PageTitle>No results found</PageTitle>
          </>
        )}
      </div>
    </Layout>
  );
}
