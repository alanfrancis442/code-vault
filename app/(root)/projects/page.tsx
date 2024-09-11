"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/utils/client";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { fetchUser } from "@/utils/api/api";
import { fetchProjects } from "@/utils/api/api";
import { useRouter } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";
import useUserStore from "@/app/hooks/userStore";
const PlaceholderSkeleton = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="w-[250px] rounded-xl" />
      <div>
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
};

const ProjectCard = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-col space-y-2 group">
      <div className="bg-accent hover:bg-secondary flex gap-2 justify-center items-center h-[90px] w-[200px] rounded-xl outline outline-1  hover:outline-2 outline-gray-300 transition-all">
        <div className=" capitalize group-hover:font-semibold">{name}</div>
        <FaChevronRight className="group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};

interface userData {
  id: string;
}
interface ProjectProp {
  name: string;
  data: null;
}

const dummy_json = {
  name: "Project 1",
  data: {
    tasks: [
      {
        name: "Task 1",
        description: "Task 1 description",
        status: "todo",
        due_date: "2021-08-01",
      },
      {
        name: "Task 2",
        description: "Task 2 description",
        status: "in-progress",
        due_date: "2021-08-02",
      },
      {
        name: "Task 3",
        description: "Task 3 description",
        status: "completed",
        due_date: "2021-08-03",
      },
    ],
  },
};

const Projects = () => {
  const [name, setname] = useState<string>();
  const [projects, setprojects] = useState<ProjectProp[]>();
  // const [userData, setuserData] = useState<userData>();
  // const router = useRouter();

  // useEffect(() => {
  //   fetchUser().then((user) => {
  //     if (!user) {
  //       router.replace("/signin");
  //     } else {
  //       console.log("user id", user.id);
  //       setuserData({ id: user.id });
  //     }
  //   });
  // }, []);
  const getAllProjects = async () => {
    fetchProjects().then((projects) => {
      console.log("projects", projects);
      if (projects) setprojects(projects);
    });
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const handelCreateProject = async () => {
    console.log("create project", name);

    const { data, error } = await supabase
      .from("projects")
      .insert([{ name }])
      .select();

    if (error) {
      console.log("error", error);
    } else {
      console.log("data", data);
      const project_id = data[0].id;

      await supabase
        .from("users")
        .update({ project_id: [] })
        .eq("some_column", "someValue")
        .select();

      getAllProjects();
    }
  };

  return (
    <div className="flex">
      <div className="flex p-8 gap-5 flex-wrap">
        {/* {Array(5)
          .fill(0)
          .map((_, i) => (
            <PlaceholderSkeleton key={i} />
          ))} */}
        {projects?.map((project, i) => (
          <ProjectCard key={i} name={project.name} />
        ))}
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="group flex gap-2 justify-center items-center h-[90px] w-[200px] rounded-xl outline outline-1 hover:outline-2 outline-gray-300 transition ">
                <span className="group-hover:font-semibold">Add</span>
                <IoIosAddCircle className="text-3xl group-hover:scale-110 transition-all" />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Project</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new project.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Project Name"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" onClick={handelCreateProject}>
                    Create
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Projects;
