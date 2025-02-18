import SearchBar from "./components/SearchBar";
import CategoriesBar from "./components/CategoriesBar";
import TrendingProjects from "./components/TrendingProjects";

export default function Home() {
  return (
    <>
      <SearchBar />
      <CategoriesBar />
      <TrendingProjects />
      {/* <LatestArticles /> */}
    </>
  );
}
