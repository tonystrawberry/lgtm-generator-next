import Images from "@/app/ui/images";
import Header from "@/components/header";

export default async function Home() {
  return (
    <main>
      <Header />
      <div className="container px-0">
        <Images />
      </div>
    </main>
  );
}
