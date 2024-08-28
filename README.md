# CODE-VAULT

CODE-VAULT is an innovative code-sharing platform designed to simplify the process of sharing code with built-in formatting features and seamless image attachments. Developed using Next.js and Supabase, CODE-VAULT enables users to easily upload code snippets, attach relevant images, and export everything as a well-formatted PDF. This tool provides a streamlined solution for sharing code along with visual context.

> **Note**: This project is still under active development and is not yet production-ready.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

## Introduction
CODE-VAULT aims to enhance code sharing by allowing users to upload and format code snippets. It supports the addition of images related to the code, which are appended at the bottom of the exported PDF. This feature helps users provide a complete view of their projects.

## Features
- **Code Upload**: Paste code snippets directly into the platform.
- **Image Upload**: Attach images that will be included at the bottom of the PDF.
- **PDF Export**: Export your code and images as a well-formatted PDF with a single click.
- **Code Formatter**: Integrated formatting to ensure code readability and consistency.
- **User Authentication**: Secure user accounts managed by Supabase.
- **Responsive Design**: Intuitive interface optimized for all devices.

## Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Supabase](https://supabase.com/)
- **Styling**: CSS/SCSS, Tailwind CSS (optional)
- **PDF Generation**: Libraries like `pdf-lib` or `jspdf` (under consideration)
- **Code Formatting**: Prettier, Prism.js for syntax highlighting

## Installation
To get started with CODE-VAULT locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/code-vault.git
   cd code-vault
## Usage

With CODE-VAULT, you can:

1. **Create an account**: Register or log in with an existing account.
2. **Upload code**: Paste code into the editor, which formats it automatically.
3. **Upload images**: Attach images to be included at the bottom of the PDF.
4. **Download as PDF**: Generate and download a formatted PDF containing your code and images.

## Contributing

We welcome contributions! To contribute:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bugfix.
3. **Submit a pull request** with a clear description of your changes.

## Roadmap

Future enhancements include:

- [ ] Complete PDF export functionality with code formatting and image attachment.
- [ ] Add syntax highlighting for multiple programming languages in the code editor.
- [ ] Implement user profile pages to manage shared code and images.
- [ ] Improve design and add customizable themes.
- [ ] Introduce collaborative editing features for teams.
