# Agent Management Dashboard

This is an Agent Management Dashboard built using **Next.js** and the **Shadcn/ui** library. The dashboard allows users to manage a list of agents, view their details, and perform tasks like initiating test calls or chats with the agents.

## Features

- **Agent List Table**: Displays a list of agents with pagination functionality.
- **Agent Details Page**: Clicking on an agent's name opens a page with detailed information about the agent.
  - **Editable Agent Name**: The name of the agent is displayed in the navbar and can be edited directly from the navbar.
  - **Two Sidebar Layout**: 
    - First sidebar displays options, and based on the selection, the second sidebar displays dynamic content.
  - **Test Call and Test Chat**: 
    - Test call initiates a call with the agent.
    - Test chat provides a chat box to interact with the agent and test the prompts.
  - **Auto-Save Feature**: Any changes made to the agent's name or prompt are saved automatically.

## Tech Stack

- **Next.js** (React Framework)
- **Shadcn/ui** (UI components)
- **Retell API** (For agent creation, retrieval, and interaction)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
Install the dependencies:

bash
Copy code
npm install
Create a .env.local file in the root of your project and add your Retell API key:

makefile
Copy code
RETELL_API_KEY=your-api-key-here
Run the application locally:

bash
Copy code
npm run dev
Open http://localhost:3000 to see the dashboard in action.

API Integration
The dashboard interacts with the Retell API to create, retrieve, and update agent information. API endpoints include:

Create Agent: API to create a new agent.
Retrieve Agent: Fetch agent details by ID.
Update Agent: Modify the details of an existing agent.
For more details on the Retell API, check out their official documentation.

Folder Structure
pages/: Contains the pages for the Next.js app (Home, Agent details).
components/: Contains reusable UI components like the table, sidebar, and modals.
utils/: Utility functions for API calls and data handling.
Future Enhancements
Implement user authentication and role-based access.
Improve the styling of agent details and add more configuration options.
Add additional test modes (e.g., speech-to-text, voice modification).
License
This project is licensed under the MIT License - see the LICENSE file for details.