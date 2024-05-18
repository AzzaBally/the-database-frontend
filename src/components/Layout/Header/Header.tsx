import GenreDropdown from "./GenreDropDown/GenreDropdown";
import Navbar from "./Navbar/Navbar";

interface HeaderProps {
  mediaType: string | undefined;
  genreList: string[] | undefined;
  isAuthenticated: boolean;
}

export default function Header({ mediaType, genreList, isAuthenticated }: HeaderProps) {
  return (
    <>
      <div>
        <h1>The Database</h1>
      </div>
      <GenreDropdown genreList={genreList} />
      <Navbar mediaType={mediaType} isAuthenticated={isAuthenticated} />
    </>
  );
}
