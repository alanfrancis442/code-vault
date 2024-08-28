import prettier from "prettier";

type Language = "javascript" | "typescript" | "css" | "html" | string; // Add more as needed

export async function formatCode(
  code: string,
  language: Language
): Promise<string> {
  try {
    let parser: prettier.BuiltInParserName | undefined;

    switch (language) {
      case "javascript":
      case "typescript":
      case "css":
      case "html":
        parser = language as prettier.BuiltInParserName;
        break;
      // Add more languages and parsers as needed
      default:
        throw new Error(`Unsupported language: ${language}`);
    }

    // Format code and await result if needed
    const formattedCode = await prettier.format(code, {
      parser,
    });

    return formattedCode;
  } catch (error) {
    console.error(`Error formatting code: ${error}`);
    return code; // Return original code if formatting fails
  }
}
