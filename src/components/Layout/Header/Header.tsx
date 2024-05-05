import GenreDropdown from "./GenreDropDown/GenreDropdown";
import Navbar from "./Navbar/Navbar";

interface HeaderProps {
  genreList: Record<string, string>[];
  isAuthenticated: boolean;
}

export default function Header({ genreList, isAuthenticated }: HeaderProps) {
  return (
    <>
      <div>
        <h1>The Database</h1>
      </div>
      <GenreDropdown genreList={genreList} />
      <Navbar isAuthenticated={isAuthenticated} />
    </>
  );
}
