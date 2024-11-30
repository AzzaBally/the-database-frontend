export function buildGenreSearchUrl(genre: string) {
  return `/the-database-frontend/#/search?genres=${genre
    .toLowerCase()
    .replaceAll(" ", "-")}`;
}

export function buildRatingSearchUrl(rating: number) {
  return `/the-database-frontend/#/search?rating=${rating}`;
}

