export const backendDomain = "http://localhost:8000/"
// export const backendDomain = "https://azzabally.pythonanywhere.com/"

export const loginEndpoint = backendDomain + "api-token-auth/"
export const homepageEndpoint = backendDomain + "fetch-homepage-data/{{MEDIA_TYPE}}"
export const timelineEndpoint = backendDomain + "fetch-timeline-data/"
export const showItemEndpoint = backendDomain + "fetch-media-item-data/{{MEDIA_TYPE}}/{{MEDIA_ID}}"

export const imageEndpoint = backendDomain + "media/{{IMAGE_LOCATION}}"