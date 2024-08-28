import React from "react";
import Sidebar from "@/components/ui/sidebar";
import CodeCanvas from "@/components/ui/codeCanvas";
import Image from "next/image";

export default function Main() {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col p-5 gap-3">
        <div className="flex-1">
          <CodeCanvas />
        </div>
        <div className="h-40 flex gap-5 items-start">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Image
              key={index}
              src={"/image_placeholder.svg"}
              alt="random"
              height={80}
              width={80}
            ></Image>
          ))}
        </div>
      </div>
    </div>
  );
}
