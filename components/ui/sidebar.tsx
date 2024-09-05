"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./button";
import { IoMdMore } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { supabase } from "@/utils/client";

export default function Sidebar() {
  const router = useRouter();
  // Dummy options
  const options = [
    { title: "Option 1", description: "Description 1" },
    { title: "Option 2", description: "Description 2" },
    { title: "Option 3", description: "Description 3" },
    { title: "Option 4", description: "Description 4" },
    { title: "Option 5", description: "Description 5" },
    { title: "Option 6", description: "Description 6" },
    { title: "Option 7", description: "Description 7" },
    { title: "Option 8", description: "Description 8" },
    { title: "Option 9", description: "Description 9" },
    { title: "Option 10", description: "Description 10" },
  ];

  // State to manage client-side rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  const handelLogout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    else {
      router.replace("/signin");
    }
  };

  return (
    <div className="max-h-screen">
      <ScrollArea className="h-4/5 w-[350px] rounded-md border p-4">
        <div className="flex flex-col gap-2">
          {options.map((option, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Button variant={"default"} className="p-8 text-left">
                  <span className="font-bold w-full">{option.title}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <IoMdMore className="text-xl" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="flex justify-between">
                        Delete{" "}
                        <MdOutlineDeleteOutline className="text-xl text-destructive" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Are you sure you want to delete?
                </DialogDescription>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Delete</Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 flex gap-5 items-center justify-between border-r">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>user name</span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IoMdMore className="text-xl" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={handelLogout}
                  className="flex justify-between text-red-500"
                >
                  Logout
                  <MdLogout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  );
}
