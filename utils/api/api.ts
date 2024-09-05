import axios from "axios";
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

export { format_code };
