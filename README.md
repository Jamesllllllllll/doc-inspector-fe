# Doc Inspector - AI Assistant Report Generator

Built for [AI Tinkerer's Generative AI Hackathon](https://hainghiem.notion.site/AI-Tinkerers-first-generative-AI-hackathon-in-Ottawa-6a913ef2bce449a6a4548719dcf9fa07) by [Michael Wiltfong](https://github.com/mdwiltfong) and [James Keezer](https://github.com/Jamesllllllllll)

Deployed to [https://doc-inspector-fe.vercel.app/](https://doc-inspector-fe.vercel.app/)

**Status:** *Incomplete!* The app does not yet modify the template.

This is the Front-End repo. [The Back-End repo is here](https://github.com/mdwiltfong/doc-inspector).

- Back-end built with **Gadget** - [website](https://gadget.dev) - [GitHub](https://github.com/gadget-inc)
- Front-end built with **NextJS**

## Project Overview

This web app is designed to help the user extract information from a document and generate reports based on the source material. It allows users to upload a PDF, engage in AI-powered discussions about its content, and use these insights to create a new document. The new document's format is determined by a markdown file for a custom output.

![Doc-Inspector-screenshot](https://github.com/Jamesllllllllll/doc-inspector-fe/assets/125431058/509e2287-537f-4e38-8da1-6c698bffc504)

## Features

### Document Upload and Processing
- Upload PDFs on various topics like software features or legal briefings.
- Store documents for AI processing.

### AI-Powered Interaction
- Interact with an OpenAI AI assistant to get answers based on the document.
- Allow AI to generate a new document with user instructions based on this user-defined format.

### User Experience Design
- A guided UX from querying information to creatively assembling a new document.

## Technical Specifications

- **Postgres database:** Gadget.dev back-end automated DB creation, hosting, migration, and scaling.
- **NodeJS:** Extend backend with JavaScript functions, local or web editing.
- **APIs:** Gadget's GraphQL API and NPM package for CRUD, custom endpoints.
- **File Storage:** Gadget's secure CDN for image/media file storage with upload limits.

## Considerations

- Maintain information accuracy in AI responses to prevent misinformation.
- Balance UX between querying information and creative document assembly.
- Adapt to AI technologies' capabilities and limitations.
