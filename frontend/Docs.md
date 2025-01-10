## PUNotes Frontend Documentation

This documentation covers the frontend codebase of PUNotes, a platform providing engineering study materials.

### I. Project Structure

The frontend code resides in the `frontend` directory and is structured as follows:

* **`src/context/themeProvider.tsx`**: Manages the application's theme (light/dark/system).  Provides a React context for accessing and modifying the theme.
* **`src/App.tsx`**: The main application component, routing the user to different pages using `react-router-dom`. Uses lazy loading for improved performance.
* **`src/components/*`**: Contains reusable UI components.  Includes:
    * `Layout.tsx`:  A layout component that wraps other components, providing a consistent header (Navbar) and footer (Footer).
    * `Navbar.tsx`: The navigation bar at the top of the application. Includes a theme toggle.
    * `NavLink.tsx`: A reusable component for creating navigation links.
    * `MobileNav.tsx`:  A mobile-friendly navigation menu.
    * `Features.tsx`: Displays the key features of the application.
    * `Recent.tsx`: Shows recently added materials (currently placeholder content).
    * `Members.tsx`: Displays team member information.
    * `AssignmentTile.tsx`: Displays information for a single assignment or past question.
    * `Loader.tsx`: Loading indicator.
* **`src/pages/*`**: Contains the individual page components:
    * `Home.tsx`: The home page, featuring a search bar for filtering PDFs and displaying introductory content.
    * `PDF.tsx`: Displays a list of PDFs based on selected semester and branch.
    * `About.tsx`:  Information about the PUNotes project and team.
    * `PastQuestions.tsx`: Lists past questions. Includes search and sorting functionality.
    * `Assignments.tsx`: Lists assignments (currently a placeholder).
    * `PageNotFound.tsx`: The 404 page.
* **`src/store/*`**: Redux store implementation.
    * `pdfSlice.ts`: Redux slice managing the PDF data.  Provides actions for updating downloads.
    * `selectors.ts`: (implicitly referenced) likely contains selectors for accessing data from the Redux store.
* **`src/data/*`**: Contains data (currently placeholder data).
    * `PDF.ts`: Placeholder data for PDFs.
* **`src/utils/*`**: Helper functions.
    * `animation.tsx`: Contains animation definitions for motion.
    * `goBack.tsx`: Custom hook for navigation.
    * `sortOptions.ts`: Contains sorting options for past questions.
* **`src/types.ts`**: Type definitions.
* **`package.json`**: Project dependencies and scripts.


### II. Theme Provider (`src/context/themeProvider.tsx`)

This context provider allows for easy theme switching between light, dark, and system default.  The selected theme is persisted using `localStorage`.

**Props:**

* `children`: React children to render within the provider.
* `defaultTheme` (optional): Default theme.  Defaults to "system".
* `storageKey` (optional):  Key used for storing the theme in `localStorage`.  Defaults to "vite-ui-theme".

**Context Value:**

* `theme`: The current theme ("light", "dark", or "system").
* `setTheme`: Function to change the theme.

**Usage:**  Use the `useTheme` hook within any component to access the theme and `setTheme` function.

### III. Routing (`src/App.tsx`)

The application uses `react-router-dom` for routing.  The main routes are:

* `/`: Home page
* `/about`: About page
* `/pdfs`: PDF listing page (requires query parameters `semester` and `branch`)
* `/pastquestions`: Past questions page
* `/assignments`: Assignments page
* `*`: 404 page


### IV. Data Management (`src/store/pdfSlice.ts`)

The application uses Redux Toolkit for state management.  The `pdfSlice` manages the PDF data, which includes branches, semesters, subjects, and notes (PDF files).  The `incrementDownloads` action updates the download count for a specific PDF.

### V.  Component Details (Selected Components)

**Home Page (`src/pages/Home.tsx`):**  Features a search bar allowing users to filter PDFs by semester and branch. Uses motion for animations.

**PDF Listing Page (`src/pages/PDF.tsx`):**  Displays a list of PDFs based on query parameters.  Handles loading states and empty states.

**Past Questions Page (`src/pages/PastQuestions.tsx`):**  Displays a list of past questions.  Allows sorting by title and upload date. Includes search functionality.

### VI.  Future Improvements

* **Replace Placeholder Data:** The `PDFData` array and other placeholder data should be replaced with actual data fetching mechanisms.
* **Error Handling:** Add robust error handling for data fetching and other potential issues.
* **Improved Styling:** Further refine the styling and responsiveness.
* **Add Testing:** Include unit and integration tests to ensure code quality.
* **Backend Integration:**  Connect to a backend API for data persistence and retrieval.
