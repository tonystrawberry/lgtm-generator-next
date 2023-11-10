import Header from "@/components/header";
import FavoriteImages from "@/app/ui/favorite-images";

export default async function Favorites() {
  return (
    <main>
      <Header />
      <div className="container">
        <FavoriteImages />
      </div>
    </main>
  );
}
