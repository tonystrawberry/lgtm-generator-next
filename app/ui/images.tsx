"use client"; // This file will be processed as a client-side script.

import { useEffect, useState } from "react";
import useScrollPosition from "@/lib/useScrollPosition";
import { Copy, Heart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { LgtmImage } from "@/lib/definitions";
import clsx from "clsx";
import CustomImage from "@/components/custom-image";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useDebounce, useDebouncedCallback } from "use-debounce";

/**
 * Images is the component that renders the gallery of images.
 */
export default function Images() {
  const scrollPosition = useScrollPosition(); // Use the hook to get the scroll position. Will be used for infinite scrolling.

  const [images, setImages] = useState<LgtmImage[]>([]); // The list of images to render.
  const [nextCursor, setNextCursor] = useState<string | null>(null); // The cursor to use for the next page of images.
  const [hasMore, setHasMore] = useState<boolean>(false); // Whether there are more images to load.
  const [loading, setLoading] = useState<boolean>(false); // Whether the images are currently loading.
  const [favorites, setFavorites] = useState<string[]>([]); // The list of favorite images.
  const [search, setSearch] = useState<string | undefined>(undefined); // The search query to use for filtering images.

  // Fetch images on first render and initialize favorites from local storage.
  useEffect(() => {
    getImages();
    initializeFavorites();
  }, []);

  // Fetch images when the scroll position is greater than 80% of the page height.
  useEffect(() => {
    if (scrollPosition > 80 && !loading) {
      if (hasMore) {
        getImages(nextCursor);
      }
    }
  }, [scrollPosition]);

  /**
   * Fetches images from the API.
   *
   * @param cursor The cursor to use for the next page of images.
   */
  const getImages = async (cursor: string | null = null, keywords: string | undefined = undefined) => {
    if (loading) {
      return;
    }
    setLoading(true);

    let url = process.env.NEXT_PUBLIC_SERVER_API_URL as string; // The API endpoint to fetch images from.

    // If there are keywords, add them to the URL.
    if (keywords) {
      setImages([]);
      url = `${url}?keywords=${keywords}`;
    }

    // If there is a cursor, add it to the URL.
    if (cursor) {
      url = `${url}?cursor_created_at=${cursor}`;
    }

    // Fetch images from the API.
    const response = await fetch(url);
    const data = (await response.json()) as {
      items: LgtmImage[];
      next_cursor_created_at: string | null;
      has_more: boolean;
    };

    // If there are keywords, replace the images with the new images.
    // If there are no keywords, append the new images to the existing images.
    if (keywords) {
      setImages(data.items);
    } else {
      setImages([...images, ...data.items]);
    }
    setNextCursor(data.next_cursor_created_at);
    setHasMore(data.has_more);
    setLoading(false);
  };

  /**
   * Initializes the list of favorite images from local storage.
   * If there are no favorites, the list will be empty.
   * If there are favorites, the list will be populated with the IDs of the favorite images.
   */
  const initializeFavorites = () => {
    let favorites = localStorage.getItem("favorites");
    let arrayFavorites = favorites ? JSON.parse(favorites) : [];
    setFavorites(arrayFavorites);
  };

  /**
   * Copies the image URL to the clipboard in Markdown format.
   *
   * @param url The image URL to copy to the clipboard.
   */
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`![LGTM](${url})`);

    toast({
      title: "Copied to clipboard!",
      description:
        "The image URL has been copied to your clipboard in Markdown format.",
    });
  };

  /**
   * Toggles the favorite status of an image.
   *
   * @param event The click event.
   * @param id The ID of the image.
   */
  const toggleFavorite = async (event: any, id: string) => {
    event?.stopPropagation(); // Prevent the image from being copied to the clipboard when clicking the favorite button.

    // If the image is not a favorite, add it to the list of favorites.
    // If the image is a favorite, remove it from the list of favorites.
    let favorites = localStorage.getItem("favorites");
    let arrayFavorites = favorites ? JSON.parse(favorites) : [];
    if (!arrayFavorites.includes(id)) {
      arrayFavorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(arrayFavorites));
      setFavorites(arrayFavorites);

      toast({
        title: "Added to favorites!",
        description: "The image has been added to your favorites.",
      });
    } else {
      arrayFavorites = arrayFavorites.filter((item: string) => item !== id);
      localStorage.setItem("favorites", JSON.stringify(arrayFavorites));
      setFavorites(arrayFavorites);

      toast({
        title: "Removed from favorites!",
        description: "The image has been removed from your favorites.",
      });
    }
  };

  /**
   * Handles the search input change event.
   *
   * @param event The change event.
   */
  const onSearchChange = useDebouncedCallback((search: string) => {
    if (search === "") {
      setImages([]);
    }

    setNextCursor(null);
    getImages(null, search);
    initializeFavorites();

    setSearch(search);
  }, 300);

  return (
    <div className="p-8">
      {/* Only show search bar if WITH_SEARCH is set to true */}
      { process.env.NEXT_PUBLIC_WITH_SEARCH === "true" && <Input className="mb-8" placeholder="Baseball.." onChange={(e) => onSearchChange(e.target.value)}/> }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images &&
          images.map((image: any, index: any) => (
            <div
              key={index}
              className="rounded overflow-hidden relative cursor-pointer max-h-[315px]"
              onClick={() => copyToClipboard(image.image_url)}
            >
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-50 transition-opacity duration-300 z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Copy size={64} color="black" />
                </div>
              </div>

              <div
                className={clsx(
                  "absolute rounded-full p-2 opacity-80 m-4 hover:opacity-100 z-20",
                  {
                    "bg-red-600": favorites.includes(image.id),
                    "bg-white": !favorites.includes(image.id),
                  }
                )}
                onClick={(e) => toggleFavorite(e, image.id)}
              >
                <Heart
                  size={20}
                  color={favorites.includes(image.id) ? "white" : "red"}
                />
              </div>

              <CustomImage src={image.image_url} alt="LGTM" width={500} height={400} className="p-2 z-0" />
            </div>
          ))}

        {loading && (
          <div className="col-span-3 flex justify-center items-center mt-16">
            <Icons.spinner className="mr-2 h-16 w-16 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
