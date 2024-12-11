"use client";

import * as React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

type Props = {};

export const BorrowForm = (props: Props) => {
  const params = useSearchParams();
  const media = params.get("media");
  const id = Number(params.get("id"));
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    memberId: "",
    mediaId: id,
    dueDate: "",
    pickupDeliveryChoice: "",
  });

  const [response, setResponse] = useState<any>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error: any) {
      setResponse({ error: "Failed to borrow media." });
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-lg bg-white/50 p-6 shadow-lg rounded-lg">
        {response && (
          <div
            className={`mt-4 p-4 rounded-md shadow-md ${
              response.error
                ? "bg-red-100 border border-red-300 text-red-700"
                : "bg-green-100 border border-green-300 text-green-700"
            }`}
          >
            {response.error ? (
              <p>
                <strong>Error:</strong> {response.error}
              </p>
            ) : (
              <p>
                <strong>Success:</strong> {response.message}
              </p>
            )}
          </div>
        )}
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-active">
            Borrow Media
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <Label className="mb-2 text-sm font-medium text-gray-600">
                Media
              </Label>
              <Input
                name="mediaId"
                value={String(media)}
                disabled
                className="bg-gray-100 border border-gray-300 rounded-md text-gray-800"
              />
            </div>
            <div>
              <Label className="mb-2 text-sm font-medium text-gray-600">
                Library Member ID
              </Label>
              <Input
                name="memberId"
                value={form.memberId}
                onChange={handleChange}
                placeholder="Enter your Member ID"
                className="bg-white border border-gray-300 rounded-md focus:ring focus:ring-teal-400"
              />
            </div>
            <div className={"flex flex-1  gap-2 w-full justify-center"}>
              <div className={"flex-[0.5]"}>
                <Label className="mb-2 text-sm font-medium text-gray-600">
                  Due Date
                </Label>
                <Input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md focus:ring focus:ring-teal-400"
                />
              </div>
              <div className={"flex-[0.5]"}>
                <Label className="mb-2 text-sm font-medium text-gray-600">
                  Pickup or Delivery Method
                </Label>
                <Select
                  value={form.pickupDeliveryChoice}
                  onValueChange={(value) =>
                    setForm((prevForm) => ({
                      ...prevForm,
                      pickupDeliveryChoice: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select Pickup or Delivery"/>
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="in-branch">In-Branch Pickup</SelectItem>
                    <SelectItem value="home-delivery">Home Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button
              type="button"
              className="w-full px-4 py-2 text-text rounded bg-muted  hover:bg-background"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-white bg-active rounded hover:bg-muted hover:text-text flex justify-center items-center"
            >
              {loading ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                "Confirm Borrowing"
              )}
            </Button>
          </CardFooter>

        </form>

      </Card>
    </div>
  );
};
