"use client";

import * as React from "react";
import { useMemo, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";

interface IMember {
  member_id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  formattedMember: string;
}

type Props = {};

export const BorrowForm = (props: Props) => {
  const params = useSearchParams();
  const router = useRouter();
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
  const [members, setMembers] = useState<IMember[] | null>(null);
  const [memberError, setMemberError] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const fetchMemberDetails = async () => {
    if (!form.memberId) {
      setMemberError("Please enter a valid Member ID.");
      return;
    }
    setMemberError(null);
    setMembers(null);
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8080/members`);
      if (!res.ok) throw new Error("Failed to fetch members");

      const data = await res.json();
      if (!data.members || !Array.isArray(data.members)) {
        throw new Error(
          "Invalid response structure: 'member' is missing or not an array"
        );
      }
      setMembers(data.members);
      const foundMember = data.members.find(
        (m: IMember) => m.member_id === Number(form.memberId)
      );
      if (!foundMember) {
        setMemberError("No member found with the given ID.");
      }
    } catch (error: any) {
      console.log("Error fetching members:", error);
      setMemberError("Failed to fetch member details.");
    } finally {
      setLoading(false);
    }
  };

  const member = useMemo(() => {
    if (!form.memberId || !members) return null;
    return members.find((m) => m.member_id === Number(form.memberId));
  }, [form.memberId, members]);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-lg bg-white/50 p-6 shadow-lg rounded">
        {response && (
          <div
            className={`mt-4 p-4 rounded shadow-md ${
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
                Media Name
              </Label>
              <Input
                name="mediaId"
                value={String(media)}
                disabled
                className=" font-bold rounded"
              />
            </div>
            <div>
              <Label className="mb-2 text-sm font-medium text-gray-600">
                Library Member
              </Label>
              <div className="flex gap-2">
                <Input
                  name="memberId"
                  value={form.memberId}
                  onChange={handleChange}
                  placeholder="Enter Library Member ID"
                  className={"rounded"}
                />
                <Button
                  type="button"
                  onClick={fetchMemberDetails}
                  className="px-4 py-2 bg-active text-background rounded hover:bg-background hover:text-text"
                >
                  {loading ? "Loading..." : "Find"}
                </Button>
              </div>
              {member && form.memberId && (
                <Input value={member.name} disabled className="mt-2 rounded" />
              )}
              {memberError && (
                <p className="mt-2 text-sm text-red-500">{memberError}</p>
              )}
            </div>
            <div className={"flex flex-1 gap-2 w-full justify-center"}>
              <div className={"flex-[0.5]"}>
                <Label className="mb-2 text-sm font-medium text-gray-600">
                  Due Date
                </Label>
                <Input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className={"rounded"}
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
                  <SelectTrigger className="w-full  rounded">
                    <SelectValue placeholder="Select Pickup or Delivery" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="in-branch">In-Branch Pickup</SelectItem>
                    <SelectItem value="home-delivery">Home Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button
              onClick={() => router.back()}
              type="button"
              className="w-full px-4 py-2 text-text rounded bg-muted hover:bg-background"
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
