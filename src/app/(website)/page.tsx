import SearchBar from "./components/SearchBar";
import CategoriesBar from "./components/CategoriesBar";
import TrendingProjects from "./components/TrendingProjects";
import LatestArticles from "./components/LatestArticles";

export default function Home() {
  return (
    <>
      <SearchBar />
      <CategoriesBar />
      <TrendingProjects />
      <LatestArticles />
    </>
  );
}
