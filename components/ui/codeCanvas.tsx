"use client";
import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { IoCloudDownload } from "react-icons/io5";
import { IoSaveOutline } from "react-icons/io5";
import { BiImageAdd } from "react-icons/bi";
import { FaCode } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";
import AceEditor from "react-ace";
import { formatCode } from "@/utils/helpers/formatcode";

//importing themes
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-solarized_dark";

//importing languages
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";

const CodeCanvas = () => {
  const [codeSnippet, setCodeSnippet] = useState(
    "def foo():\n    print('hello')\n"
  );
  const [language, setLanguage] = useState("c_cpp");
  const [theme, setTheme] = useState("dracula");

  const handelonChange = (newValue: string) => {
    setCodeSnippet(newValue);
  };

  const languages = ["c_cpp", "java", "javascript", "python", "typescript"];
  const handelLanguagechange = (e: any) => {
    setLanguage(e.target.innerText);
  };

  //code for themes
  const themes = [
    "dracula",
    "chrome",
    "github_dark",
    "tomorrow",
    "tomorrow_night_blue",
    "solarized_dark",
  ];
  const handelThemechange = (e: any) => {
    setTheme(e.target.innerText);
  };

  const handelCodeFormat = async () => {
    setCodeSnippet(await formatCode(codeSnippet, language));
  };

  return (
    <div className="flex flex-col h-full">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <IoSaveOutline className="text-xl" />
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <BiImageAdd className="text-xl" />
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <IoCloudDownload className="text-xl" />
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <FaCode className="text-xl" />
          </MenubarTrigger>
          <MenubarContent>
            {languages.map((language) => (
              <MenubarItem onClick={handelLanguagechange} key={language}>
                {language}
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <MdColorLens className="text-xl" />
          </MenubarTrigger>
          <MenubarContent>
            {themes.map((theme) => (
              <MenubarItem onClick={handelThemechange} key={theme}>
                {theme}
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={handelCodeFormat}>
            Fromat Code
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{language}</MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>{theme}</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <AceEditor
        placeholder="//write your code here"
        mode={language}
        theme={theme}
        name="code-editor"
        onChange={handelonChange}
        onPaste={handelCodeFormat}
        fontSize={14}
        lineHeight={19}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={codeSnippet}
        height="100%"
        width="100%"
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeCanvas;
