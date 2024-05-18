export function buildGenreSearchUrl(genre: string) {
  return `/the-database-frontend/#/anime/search/genres?query=${genre
    .toLowerCase()
    .replaceAll(" ", "-")}`;
}
