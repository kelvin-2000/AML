"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Pagination } from "./pagination";
import Image from "next/image";
import Loading from "@/app/my-components/Loading";

export interface  MediaItem  {
  media_id: number;
  title: string;
  author?: string;
  media_type: string;
  category?: string;
  status: string;
  quantity_available: number;
}

export interface MediaData  {
  data: MediaItem[];
  total: number,
  page: number,
  totalPages: number
}

export function MediaList() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [mediaList, setMediaList] = useState<MediaData|null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`http://localhost:8080/media?page=${currentPage}&total=10`);
        const data = await response.json();
        setMediaList(data);
        setIsLoading(false);
      } catch (error:any) {
        console.log("Error fetching media data:", error);
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, [currentPage]);
console.log("mediaList",mediaList)
  const totalPages = mediaList &&  mediaList?.totalPages;

  const currentItems = mediaList ? mediaList?.data : [];

  const handlePageChange = (page: number) => setCurrentPage(page);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {currentItems.map((item) => (
          <div key={item.media_id} className="flex flex-col h-[50%]">
            <div className="relative aspect-[3/4] mb-4">
              <Image
                src={"/images/" + item.media_id + ".jpg" || "/images/placeholder.png"}
                alt={item.title}
                fill
                className="object-cover shadow-2xl rounded-lg  "
              />
              <Badge
                className={`absolute top-3 right-2 ${
                  item.status === "available"
                    ? "bg-muted text-text"
                    : "bg-background text-muted"
                }  px-3 py-2 text-sm shadow-xl border border-text/15 font-semibold rounded-full`}
              >
                {item.status}
              </Badge>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-active mb-2 line-clamp-2">{item.title}</h3>

              {item.author && (
                <p className="text-sm text-muted mb-1">
                  <span className="font-semibold">Author: </span>{item.author}
                </p>
              )}

              <p className="text-sm text-muted mb-1">
                <span className="font-semibold">Type: </span>{item.media_type}
              </p>

              {item.category && (
                <p className="text-sm text-muted mb-1">
                  <span className="font-semibold">Category: </span>{item.category}
                </p>
              )}

              <div className="flex justify-between items-center mt-auto">
                <Button
                  onClick={() => router.push(`/borrow?media=${item?.title}&id=${item?.media_id}`)}
                  className={`px-4 py-2 rounded transition-colors ${
                    item.status === "Available"
                      ? "bg-[rgba(255,255,255,0.1)] backdrop-blur-sm shadow-md hover:bg-muted hover:shadow-xl transition text-text"
                      : "bg-[rgba(255,255,255,0.1)] shadow-md text-active cursor-not-allowed"
                  }`}
                  disabled={item.quantity_available <= 0 || item.status !== "Available"}
                >
                  Borrow
                </Button>

                <Button
                  onClick={() => router.push(`/return?media=${item?.title}&id=${item?.media_id}`)}
                  className="px-4 py-2 rounded transition-colors bg-[rgba(255,255,255,0.1)] backdrop-blur-sm shadow-md hover:bg-muted hover:shadow-xl text-text"
                >
                  Return
                </Button>
              </div>
            </div>

          </div>
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
