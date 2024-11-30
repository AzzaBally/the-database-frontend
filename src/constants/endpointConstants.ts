import { localDevelopment } from "./toggleConstants"

export const backendDomain = localDevelopment ? "http://localhost:8000/" : "https://azzabally.pythonanywhere.com/"

export const loginEndpoint = backendDomain + "api-token-auth/"
export const logoutEndpoint = backendDomain + "logout/"
export const homepageEndpoint = backendDomain + "fetch-homepage-data/{{MEDIA_TYPE}}"
export const timelineEndpoint = backendDomain + "fetch-timeline-data/"
export const showItemEndpoint = backendDomain + "fetch-media-item-data/{{MEDIA_TYPE}}/{{MEDIA_ID}}"
export const mediaFormEndpoint = backendDomain + "submit-media-item-data/{{FORM_TYPE}}/{{MEDIA_TYPE}}"

export const imageEndpoint = backendDomain + "media/{{IMAGE_LOCATION}}"