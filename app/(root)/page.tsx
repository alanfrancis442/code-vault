import React from "react";
import Sidebar from "@/components/ui/sidebar";
import CodeCanvas from "@/components/ui/codeCanvas";

export default function Main() {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col p-5">
        <div className="flex-1">
          <CodeCanvas />
        </div>
        <div className="h-40">images</div>
      </div>
    </div>
  );
}
