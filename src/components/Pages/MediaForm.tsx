import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  mediaFormEndpoint,
  showItemEndpoint,
} from "../../constants/endpointConstants";
import { formTypes, mediaTypes } from "../../constants/objectConstants";
import {
  animeMediaFormValidator,
  baseMediaFormValidator,
} from "../../constants/zodConstants";
import { authenticatedFetch } from "../../utils/fetchUtils";
import { Button } from "../Button";
import ErrorMessage from "../ErrorMessage";
import { LabelText } from "../LabelText";
import Layout from "../Layout/Layout";
import { PageTitle } from "../PageTitle";
import { Paragraph } from "../Paragraph";
import { TextInput } from "../TextInput";

const LongTextInput = styled(TextInput)`
  width: 99%;
`;

const CheckboxFieldset = styled.fieldset`
  font-size: 19px;
  border-color: rgb(11, 12, 12);
  border-style: solid;
  max-width: 268px;
`;

const ImageInput = styled.input`
  display: block;
  font-size: 19px;
  padding: 5px;
`;

const StyledButton = styled(Button)`
  margin-top: 25px;
  min-width: 10%;
  display: block;
`;

export default function MediaForm() {
  const { mediaType = "unknown", formType, id } = useParams();

  const [mediaForm, setMediaForm] = useState<Record<string, any>>({
    id: undefined,
    name: undefined,
    newWatchDate: undefined,
    watchDatesToRemove: undefined,
    image: undefined,
    genres: undefined,
    rating: undefined,
    infoLink: undefined,
  });
  const [formErrors, setFormErrors] = useState({
    name: undefined,
    newWatchDate: undefined,
    watchDatesToRemove: undefined,
    image: undefined,
    genres: undefined,
    rating: undefined,
    infoLink: undefined,
  });

  const [showConfirmationForm, setShowConfirmationForm] = useState(false);

  useEffect(() => {
    if (
      mediaType &&
      Object.keys(mediaTypes).includes(mediaType) &&
      formType === "update" &&
      id
    ) {
      const fetchMediaItems = async () => {
        await authenticatedFetch(
          showItemEndpoint
            .replace("{{MEDIA_TYPE}}", mediaType)
            .replace("{{MEDIA_ID}}", id),
          "GET",
          (responseData) => {
            let infoLink = responseData.mediaData.infoLink;
            if (mediaType === "anime") {
              infoLink = infoLink.split("/").slice(-1)[0];
            }
            setMediaForm({
              id: id,
              name: responseData.mediaData.name,
              genres: responseData.mediaData.genres,
              rating: responseData.mediaData.rating,
              loadedWatchDates: responseData.mediaData.watchDates,
              infoLink: infoLink,
            });
          }
        );
      };
      fetchMediaItems();
    }
    // eslint-disable-next-line
  }, []);

  const imageInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var file = event.target.files?.[0];
    if (file && (file.name.endsWith(".png") || file.name.endsWith(".jpg"))) {
      var reader = new FileReader();
      reader.onloadend = function () {
        setMediaForm((prevMediaForm) => {
          return {
            ...prevMediaForm,
            image: reader.result,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      mediaType &&
      Object.keys(mediaTypes).includes(mediaType) &&
      formType &&
      Object.keys(formTypes).includes(formType)
    ) {
      let validator;
      if (mediaType === "anime") {
        validator = animeMediaFormValidator;
      } else {
        validator = baseMediaFormValidator;
      }
      const formValidation = validator.safeParse(mediaForm);
      if (formValidation.success) {
        await authenticatedFetch(
          mediaFormEndpoint
            .replace("{{FORM_TYPE}}", formType)
            .replace("{{MEDIA_TYPE}}", mediaType),
          "POST",
          (responseData: Record<string, any>) => {
            window.location.href = `/the-database-frontend/#/${mediaType}/view/${responseData.id}`;
          },
          formValidation.data
        );
      } else {
        setShowConfirmationForm(false);
        setFormErrors({
          name: undefined,
          newWatchDate: undefined,
          watchDatesToRemove: undefined,
          image: undefined,
          genres: undefined,
          rating: undefined,
          infoLink: undefined,
        });
        formValidation.error.issues.forEach((issue) =>
          setFormErrors((prevFormErrors) => {
            return { ...prevFormErrors, [issue.path.join()]: issue.message };
          })
        );
      }
    }
  };

  return (
    <Layout>
      {(formType === "add" || (formType === "update" && mediaForm.id)) && (
        <form onSubmit={onSubmit} autoComplete="off">
          {!showConfirmationForm && (
            <>
              {formType === "add" && (
                <>
                  <PageTitle>Add New {mediaTypes[mediaType]}</PageTitle>
                  <hr />
                  <br />
                  <LabelText htmlFor="nameInput">
                    {mediaTypes[mediaType]} Name
                  </LabelText>
                  <ErrorMessage errorMessage={formErrors.name} />
                  <LongTextInput
                    type="text"
                    placeholder="Enter Name"
                    name="nameInput"
                    value={mediaForm.name}
                    $error={formErrors.name}
                    onChange={(e) =>
                      setMediaForm((prevMediaForm) => {
                        return { ...prevMediaForm, name: e.target.value };
                      })
                    }
                  />
                </>
              )}
              {formType === "update" && (
                <>
                  <PageTitle>Update {mediaForm?.name}</PageTitle>
                  <hr />
                </>
              )}
              <br />
              <LabelText htmlFor="watchDateInput">New Watch Date</LabelText>
              <ErrorMessage errorMessage={formErrors.newWatchDate} />
              <TextInput
                type="text"
                placeholder="YYYY-MM-DD"
                name="watchDateInput"
                value={mediaForm.newWatchDate}
                $error={formErrors.newWatchDate}
                onChange={(e) =>
                  setMediaForm((prevMediaForm) => {
                    return { ...prevMediaForm, newWatchDate: e.target.value };
                  })
                }
              />
              {formType === "update" && mediaForm?.loadedWatchDates && (
                <>
                  <br />
                  <CheckboxFieldset>
                    <legend>Select Watch Dates to Remove</legend>
                    <ErrorMessage
                      errorMessage={formErrors.watchDatesToRemove}
                    />
                    {mediaForm.loadedWatchDates.map(
                      (watchDate: Record<string, string>, index: number) => (
                        <div key={watchDate?.watchDate}>
                          <input
                            type="checkbox"
                            name={`watchDateRemoval${index}`}
                            checked={mediaForm?.watchDatesToRemove?.includes(
                              watchDate?.watchDate
                            )}
                            onChange={(e) =>
                              setMediaForm((prevMediaForm) => {
                                return {
                                  ...prevMediaForm,
                                  watchDatesToRemove: e.target.checked
                                    ? [
                                        ...(prevMediaForm?.watchDatesToRemove ??
                                          []),
                                        watchDate?.watchDate,
                                      ]
                                    : prevMediaForm?.watchDatesToRemove.filter(
                                        (item: string) =>
                                          item !== watchDate?.watchDate
                                      ),
                                };
                              })
                            }
                          />
                          <label htmlFor={`watchDateRemoval${index}`}>
                            {watchDate?.watchDate}
                          </label>
                        </div>
                      )
                    )}
                  </CheckboxFieldset>
                </>
              )}
              <br />
              <LabelText htmlFor="imageInput">
                {mediaTypes[mediaType]} Image
              </LabelText>
              <ErrorMessage errorMessage={formErrors.image} />
              <ImageInput
                type="file"
                name="imageInput"
                onChange={imageInputOnChange}
              />
              {mediaType === "anime" && (
                <>
                  <br />
                  <LabelText htmlFor="genresInput">Genres</LabelText>
                  <ErrorMessage errorMessage={formErrors.genres} />
                  <LongTextInput
                    type="text"
                    placeholder="Enter Genres"
                    name="genresInput"
                    value={mediaForm?.genres ?? ""}
                    $error={formErrors.genres}
                    onChange={(e) =>
                      setMediaForm((prevMediaForm) => {
                        return {
                          ...prevMediaForm,
                          genres: e.target.value,
                        };
                      })
                    }
                  />
                  <br />
                  <LabelText htmlFor="ratingInput">Rating</LabelText>
                  <ErrorMessage errorMessage={formErrors.rating} />
                  <TextInput
                    type="number"
                    placeholder="Enter Rating"
                    name="ratingInput"
                    value={mediaForm?.rating ?? ""}
                    $error={formErrors.rating}
                    onChange={(e) =>
                      setMediaForm((prevMediaForm) => {
                        return {
                          ...prevMediaForm,
                          rating: Number(e.target.value),
                        };
                      })
                    }
                  />
                  <br />
                  <LabelText htmlFor="ratingInput">MAL Code</LabelText>
                  <ErrorMessage errorMessage={formErrors.infoLink} />
                  <TextInput
                    type="text"
                    placeholder="Enter MyAnimeList Code"
                    name="malCodeInput"
                    value={mediaForm?.infoLink ?? ""}
                    $error={formErrors.infoLink}
                    onChange={(e) =>
                      setMediaForm((prevMediaForm) => {
                        return {
                          ...prevMediaForm,
                          infoLink: e.target.value,
                        };
                      })
                    }
                  />
                </>
              )}
              <StyledButton
                type={formType === "update" ? "button" : "submit"}
                onClick={
                  formType === "update"
                    ? (e) => setShowConfirmationForm(true)
                    : undefined
                }
              >
                {formTypes[formType]} Media Item
              </StyledButton>
            </>
          )}
          {showConfirmationForm && (
            <>
              <PageTitle>Confirm Changes</PageTitle>
              <hr />
              <br />
              <Paragraph>Name: {mediaForm.name}</Paragraph>
              <Paragraph>
                {`New Watch Date: ${
                  mediaForm.newWatchDate
                    ? mediaForm.newWatchDate
                    : "Not updated"
                }`}
              </Paragraph>
              <Paragraph>
                {`Watch Date to Remove: ${
                  mediaForm.watchDatesToRemove &&
                  mediaForm.watchDatesToRemove?.length > 0
                    ? mediaForm.watchDatesToRemove.join(", ")
                    : "Not Updated"
                }`}
              </Paragraph>
              <Paragraph>
                {`Image: ${mediaForm.image ? "Updated" : "Not updated"}`}
              </Paragraph>
              {mediaType === "anime" && (
                <>
                  <Paragraph>{`Genres: ${mediaForm.genres}`}</Paragraph>
                  <Paragraph>{`Rating: ${mediaForm.rating}`}</Paragraph>
                  <Paragraph>{`MAL Code: ${mediaForm.infoLink}`}</Paragraph>
                </>
              )}
              <StyledButton type="submit">
                Confirm Media Item Changes
              </StyledButton>
              <StyledButton
                type="button"
                onClick={(e) => setShowConfirmationForm(false)}
              >
                Go Back
              </StyledButton>
            </>
          )}
        </form>
      )}
      {formType === "update" && !mediaForm.id && <p>Fetching Media Data</p>}
      {!Object.keys(formTypes).includes(formType ?? "") && (
        <p>Invalid Form Type</p>
      )}
    </Layout>
  );
}
