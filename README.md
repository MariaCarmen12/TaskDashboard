# Task Management Dashboard

## Overview

This project is a simple task management dashboard where users can add, edit, and delete tasks. The focus is on creating a user-friendly interface, managing state effectively, and leveraging TypeScript for type safety.

## Features

- **Responsive Dashboard Layout**: Designed using [Material-UI](https://mui.com/), with a clean and responsive interface.
- **Task List**: Displays all tasks with details and options to manage them.
- **Task Input Form**: Allows users to add new tasks with a title, description, and priority (High, Medium, Low).
- **Task Details View**: Provides functionality to edit or delete existing tasks.
- **Filter & Sort Options**: Users can filter tasks by priority and sort them by creation date.
- **Task Management**: Includes creation, editing, and deletion of tasks, with functionality to mark tasks as completed.
- **State Management**: Utilizes [Redux](https://redux.js.org/) to manage application state and persist data in local storage.
- **TypeScript Typing**: Strongly typed components, props, and state for better code quality and safety.
- **Testing**: Unit tests for components using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/react).
- **Accessibility**: Ensures accessibility with proper ARIA labels and keyboard navigation.

## Bonus Features

- **Drag-and-Drop Functionality**: Users can reorder tasks using drag-and-drop.
- **Dark Mode Toggle**: Switch between light and dark themes.
- **Mock API Integration**: Simulate fetching and saving tasks from a server.

## Requirements

### User Interface

- Design a responsive dashboard layout using CSS or a UI framework like Material-UI, Chakra UI, or Tailwind CSS.
- Include the following components:
  - **Task List**: A list displaying all tasks.
  - **Task Input Form**: A form to add a new task with fields for the task title, description, and priority (e.g., High, Medium, Low).
  - **Task Details View**: A view to edit or delete an existing task.
  - **Filter & Sort Options**: Provide options to filter tasks by priority and sort them by creation date.

### Task Management

- Implement task creation, editing, and deletion functionalities.
- Allow users to mark tasks as completed.
- Implement a confirmation dialog for deleting tasks.

### State Management

- Use React’s Context API or a state management library like Redux or Zustand to manage the application’s state.
- Persist the task list in local storage, so that tasks remain even after the page is refreshed.

### TypeScript Typing

- Strongly type all components, props, and state using TypeScript.
- Implement custom types/interfaces where necessary (e.g., Task type with title, description, priority, creation date, etc.).

### Testing

- Write unit tests for at least one component using Jest and React Testing Library.
- Ensure TypeScript types are covered in the tests.

### Accessibility

- Ensure that the application is accessible and follows best practices (e.g., proper use of ARIA labels, keyboard navigation).

## Installation

1. **Clone the Repository**

   ```bash
    git clone https://github.com/MariaCarmen12/TaskDashboard.git
    cd TaskDashboard


2. **Install Dependencies**
    ```bash
    npm install

3. **Run Tests**
    ```bash
    npm test

4. **Run the Application**
    ```bash
    npm start





## Project Structure
- src/: Contains the main source code.
- components/: React components for the dashboard, including UI elements like forms, buttons, modals, and task lists.
- Styles/: Component styles configurations, often using styled-components or CSS modules for styling.
- context/: Redux or Context API state management setup, including slices, reducers, and actions to manage application state.
- interfaces/: TypeScript interfaces and types, defining the structure of data used throughout the application.
- pages/: Page-level components representing different views or routes in the application, such as the dashboard or specific task views.
- services/: Utility functions or API services used for interacting with backend services or external APIs.
- tests/: Unit tests for the components, ensuring the functionality and correctness of the code through automated testing.

## Approach
- User Interface: Implemented a responsive design with Material-UI, ensuring a clean and intuitive user experience.
- State Management: Used Redux for state management and local storage to persist tasks.
- TypeScript Typing: All components, props, and state are strongly typed to ensure type safety and reduce bugs.
- Testing: Covered key components with unit tests to ensure reliability.
- Accessibility: Followed best practices to make the application accessible.
Trade-Offs
- UI Framework Choice: Material-UI was chosen for its comprehensive component library and ease of use.
- State Management: Opted for Redux due to its robust ecosystem and scalability for larger applications.

## Running Locally
Follow the installation steps above to set up the project locally. Ensure that you have Node.js installed.

## Contribution
Feel free to open issues or submit pull requests to improve the project. For any questions, contact carmelitaglez21@gmail.com.

## License
This project is licensed under the MIT License.