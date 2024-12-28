"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Pagination } from "./pagination";
import { Book, Music, Film, Grid2x2, UserRoundPen } from "lucide-react";
import Loading from "@/app/my-components/Loading";

export interface IMediaItem {
  media_id: number;
  title: string;
  author?: string;
  media_type: string;
  category?: string;
  status: string;
  quantity_available: number;
}

export interface MediaData {
  data: IMediaItem[];
  total: number;
  page: number;
  totalPages: number;
}

const MediaCard: React.FC<{ item: IMediaItem }> = ({ item }) => {
  const router = useRouter();

  const getIcon = (mediaType: string) => {
    switch (mediaType.toLowerCase()) {
      case "book":
        return (
          <Book className="inline-block mr-1 text-primary" aria-label="Book" />
        );
      case "cd":
        return (
          <Music className="inline-block mr-1 text-primary" aria-label="CD" />
        );
      case "dvd":
        return (
          <Film className="inline-block mr-1 text-primary" aria-label="DVD" />
        );
      default:
        return (
          <Book
            className="inline-block mr-1 text-primary"
            aria-label="Default Icon"
          />
        );
    }
  };

  return (
    <div className="p-4 border rounded bg-white/30 hover:bg-white/50 transition-all shadow-md flex flex-col items-start">
      <div className="flex items-center  mb-4">
        <h3 className="text-lg font-bold text-text">{item.title}</h3>
      </div>
      <Badge
        className={`bg-background text-active px-2 py-1 text-xs shadow-xl border border-text/15 font-semibold rounded-full`}
      >
        {item.status}
      </Badge>
      {item.category && (
        <p className="mt-2 text-sm text-muted">
          <span className="font-semibold">
            {getIcon(item.media_type)} {item.category}
          </span>
        </p>
      )}
      {item.author && (
        <p className="mt-2 text-sm text-muted">
          <span className="font-semibold">
            <UserRoundPen className="inline-block mr-1" /> {item.author}
          </span>
        </p>
      )}
      <div className=" flex space-x-2 mt-3">
        <Button
          onClick={() =>
            router.push(`/borrow?media=${item?.title}&id=${item?.media_id}`)
          }
          className={`px-2 py-0.5 text-xs rounded transition-colors ${
            item.status.toLowerCase() === "available"
              ? "bg-[rgba(255,255,255,0.1)] backdrop-blur-sm shadow-md hover:bg-muted hover:shadow-xl transition text-text"
              : "bg-[rgba(255,255,255,0.1)] shadow-md text-active cursor-not-allowed"
          }`}
          disabled={item.quantity_available <= 0 || item.status.toLowerCase() !== "available"}
        >
          Borrow
        </Button>
        <Button
          onClick={() =>
            router.push(`/return?media=${item?.title}&id=${item?.media_id}`)
          }
          className="px-2 py-0.5 text-xs rounded transition-colors bg-[rgba(255,255,255,0.1)] backdrop-blur-sm shadow-md hover:bg-muted hover:shadow-xl text-text"
        >
          Return
        </Button>
      </div>
    </div>
  );
};

export function MediaList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [mediaList, setMediaList] = useState<MediaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/media?page=${currentPage}&total=10`
        );
        const data = await response.json();
        setMediaList(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching media data:", error);
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, [currentPage]);

  const totalPages = mediaList?.totalPages || 0;
  const currentItems = mediaList ? mediaList.data : [];

  const handlePageChange = (page: number) => setCurrentPage(page);

  if (isLoading) {
    return <Loading />;
  }

  if (!mediaList || currentItems.length === 0) {
    return <p className="text-center text-muted">No media items available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {currentItems.map((item) => (
          <MediaCard key={item.media_id} item={item} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
