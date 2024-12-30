"use client";

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import ImageCaseroul from "./image-caseroul";

export type UsersProps = {
  userId: string;
  imageUrl: string;
  username: string;
  date_sent: string;
  idImageUrl: string | null;
  faceImageUrl: string | null;
  status: string;
};

const columns: ColumnDef<UsersProps>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <UserAvatar
          username={row.original.username}
          imageUrl={row.original.imageUrl}
        />
        <span>{row.original.username}</span>
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        id Image
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <ImageCaseroul
        id={row.original.userId}
        title={row.original.idImageUrl || ""}
        idImageUrl={row.original.idImageUrl || ""}
        faceImageUrl={row.original.faceImageUrl || ""}
      />
    ),
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Face image
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <ImageCaseroul
        id={row.original.userId}
        title={row.original.faceImageUrl || ""}
        idImageUrl={row.original.idImageUrl || ""}
        faceImageUrl={row.original.faceImageUrl || ""}
      />
    ),
  },
  {
    accessorKey: "approved",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.status}</span>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Sent
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.date_sent}</span>,
  },
];

export default columns;
