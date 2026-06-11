# Gemini CLI - Project Context: personalWebSiteTERMINAL

This project is a personal portfolio website for Induwara Jayalath, featuring a retro terminal-themed interactive user interface.

## Project Overview

*   **Type:** Static Web Application (Terminal Emulator)
*   **Technologies:** Vanilla JavaScript, HTML5, CSS3 (Custom Properties)
*   **Hosting:** Firebase Hosting (Project ID: `induwara-j`)
*   **Architecture:** The core logic is a custom terminal emulator implemented in pure JavaScript. It uses a singleton pattern to manage configurations and a virtual file system.

## Key Directories

*   `public/`: Contains the main website assets.
    *   `index.html`: The main entry point for the terminal interface.
    *   `gui.html`: The elegant graphical user interface.
    *   `css/main.css`: Terminal styling and animations.
    *   `css/gui.css`: Modern styling and animations for the graphical UI.
    *   `js/main.js`: Core terminal logic, command handling, and "file" content.
    *   `js/polyfills.js`: Compatibility support for older browsers.
    *   `img/`: Avatars, favicons, and other visual assets.
    *   `boo/`: A specialized interactive Valentine's Day invitation sub-page.

## Building and Running

### Local Development
Since the project consists of static files, no compilation is required.
*   **Option 1:** Open `public/index.html` directly in your browser.
*   **Option 2:** Use a static server (recommended for testing Firebase rewrites):
    ```bash
    # Using Node.js serve
    npx serve public
    
    # Using Python
    python -m http.server --directory public
    ```

### Deployment
The project is configured for Firebase Hosting.
*   **Deploy to Production:**
    ```bash
    firebase deploy
    ```

## Development Conventions

*   **No Frameworks:** The project explicitly avoids libraries and frameworks (e.g., React, jQuery) for the main terminal logic to maintain a lightweight, dependency-free codebase.
*   **Centralized Config:** All terminal commands, help text, and simulated files are defined in `public/js/main.js`.
    *   `configs`: Contains command definitions, help messages, and system strings.
    *   `files`: Defines the contents of the virtual file system (e.g., `about.txt`, `contact.txt`).
*   **Styling:** Uses CSS Custom Properties (Variables) defined in `:root` of `main.css` for easy theming (e.g., `--terminal-green`).
*   **Firebase Rewrites:** Configured in `firebase.json` to handle clean URLs and routing for the `/boo` sub-page.
*   **Compatibility:** `polyfills.js` is included to ensure basic functionality in older browsers like Internet Explorer.
