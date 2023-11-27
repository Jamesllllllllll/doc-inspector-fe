# Doc Inspector - AI Assistant Report Generator

## Project Overview

This web app is designed to help the user extract information from a document and generate reports based on the source material. It allows users to upload a PDF, engage in AI-powered discussions about its content, and use these insights to create a new document. The new document's format is determined by a markdown file for a custom output.

## Key Features

### Document Upload and Processing
- Upload PDFs on various topics like software features or legal briefings.
- Store these documents efficiently for AI processing.

### AI-Powered Interaction
- Interact with an AI assistant, powered by OpenAI's API, to get answers based on the document.
- Engage in a chat with the app using the uploaded data.

### Custom Document Generation
- Upload a markdown file to set the structure and style of the new document.
- Generate a PDF based on this user-defined format.

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
- Adapt to AI technologies' capabilities and limitations (Langchain, OpenAI API).
