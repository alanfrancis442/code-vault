import axios from "axios";
import { supabase } from "../client";
const format_code = async (code: string, language: string) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/format", {
      code: code,
      language: language,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return code;
  }
};

const fetchUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return user;
  } else {
    return null;
  }
};

const fetchProjects = async () => {
  const { data: projects, error } = await supabase.from("projects").select("*");
  if (error) {
    console.log("error", error);
    return null;
  }
  return projects;
};

export { format_code, fetchUser, fetchProjects };
