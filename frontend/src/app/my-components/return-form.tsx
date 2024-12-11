"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const ReturnForm = () => {
  const params = useSearchParams();
  const media = params.get("media");
  const id = Number(params.get("id"));
  const [form, setForm] = useState({ memberId: "", mediaId: id });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error: any) {
      setResponse({ error: "Failed to return media." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md p-6 bg-white/50 rounded-lg shadow-lg">
        {response && (
          <div
            className={`mt-4 p-4 rounded shadow-lg ${
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
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-active">
            Return Media
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <Label className="mb-2 block text-sm font-medium text-text" htmlFor="mediaId">
                Media
              </Label>
              <Input
                id="mediaId"
                name="mediaId"
                value={String(media)}
                disabled
                className="text-gray-900 font-bold bg-gray-100 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium text-text" htmlFor="memberId">
                Library Member ID
              </Label>
              <Input
                id="memberId"
                name="memberId"
                value={form.memberId}
                onChange={handleChange}
                placeholder="Enter Member ID"
                required
                className="bg-white border border-gray-300 rounded-md focus:ring focus:ring-indigo-400"
              />
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
                "Confirm Return"
              )}
            </Button>
          </CardFooter>
        </form>

      </Card>
    </div>
  );
};

export default ReturnForm;
