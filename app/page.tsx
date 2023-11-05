import Images from "@/app/ui/images";

export default async function Home() {
  return (
    <main>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="text-2xl font-bold sm:inline-block">
                lgtm.
              </span>
            </a>
          </div>
        </div>
      </header>
      <div className="container">
        <Images />
      </div>
    </main>
  );
}
