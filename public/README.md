# Induwara Jayalath — macOS Terminal Portfolio Website

An interactive, responsive personal portfolio website designed to look and feel like an authentic Apple **macOS Terminal & Desktop environment**.

Built with **pure Vanilla JavaScript, modern HTML5, and CSS3** (zero heavy external framework dependencies), ensuring instant sub-second load times and high visual fidelity.

---

## 🌟 Key Features

- **Authentic macOS Desktop & Window Architecture**:
  - Realistic macOS window with traffic light buttons (**Red** close/restart, **Yellow** minimize to dock, **Green** fullscreen zoom).
  - Authentic macOS glassmorphism with dynamic backdrop blur (`backdrop-filter: blur(28px)`), vibrant borders, and layered drop shadows.
  - Draggable window frames with cursor states.
  - Working **Top Menu Bar** with Apple menu (), app menus, sound toggle, Wi-Fi status, battery level, Control Center, and a live local clock.
  - Bouncing **macOS Dock** with magnification on hover, active application indicator dots, and quick-launch shortcuts.

- **Dual-Mode Experience (CLI Terminal + GUI Finder)**:
  - **Terminal Mode (`zsh`)**: Authentic command-line interface with interactive zsh-style prompt (`guest@induwara.me:~$`).
  - **GUI Mode (`Finder`)**: Toggleable macOS Finder window showcasing visual portfolio overview, tech stack breakdown, and direct contact forms.

- **Interactive Terminal Engine**:
  - **Preserves and enhances your Singleton configuration**:
    - `configs.getInstance()`: customizable text, help strings, boot welcome ASCII art, error messages, and system settings.
    - `files.getInstance()`: in-memory virtual filesystem with files (`contact.txt`, `skills.txt`, `facebook.txt`, `instagram.txt`, `gui.sh`, etc.).
  - **Command History**: Navigate previous commands with `↑` (Up Arrow) and `↓` (Down Arrow).
  - **Tab Autocompletion**: Press `Tab` to autocomplete command names and file/directory paths.
  - **Autosuggestion Ghost Text**: Dimmed inline predictions as you type.
  - **Audio Synthesis**: Optional mechanical keyboard clicking sounds and command completion chimes powered by the native Web Audio API (toggle with `sound on` / `sound off` or the menubar volume icon).
  - **Dynamic Theme Engine**: Live switch themes via `theme [name]`:
    - `macos-dark` (Default sleek Apple dark mode)
    - `homebrew` (Retro green phosphor on pure black)
    - `dracula` (Vibrant purple & cyan)
    - `matrix` (Hacker green digital rain theme)
    - `solarized` (Elegant Solarized Dark)
    - `cyberpunk` (High-contrast neon pink and cyan)

---

## 💻 Available Terminal Commands

| Command | Description |
| :--- | :--- |
| `help` | Display list of available commands and quick-run badges |
| `bio` | Display Induwara's biography card with avatar and profile tags |
| `skills` | Interactive technical competencies and proficiency bars |
| `contact` | Show contact details (`contact@induwara.me`, `076-6449000`) with 1-click copy buttons |
| `socials` | Direct links to Facebook, Instagram, GitHub, and LinkedIn |
| `gui` | Open or toggle the macOS Finder graphical portfolio window |
| `neofetch` | Apple ASCII logo with macOS system specs and developer information |
| `ls` | List files and folders in current directory (`ls -la` supported) |
| `cat <file>` | Print file content (auto-detects URLs and generates clickable preview links) |
| `cd <dir>` | Traverse virtual filesystem directories (`cd documents`, `cd ..`, `cd ~`) |
| `pwd` | Print current working directory path |
| `touch <file>` | Create a new file in the virtual filesystem |
| `mkdir <dir>` | Create a new directory |
| `rm <file>` | Delete a file or directory |
| `mv <src> <dst>`| Move or rename files |
| `echo <text>` | Print text or redirect to file (`echo "Hello" > note.txt`) |
| `whoami` | Print user credentials, accessible CPU cores, and platform info |
| `date` | Print current local system date and time |
| `theme <name>`| Switch terminal color theme |
| `wallpaper <w>`| Switch desktop background (e.g. `sequoia`, `dark`, `nebula`) |
| `matrix` | Launch falling Matrix digital rain animation |
| `weather` | Display terminal ASCII weather report |
| `sound <on/off>`| Toggle mechanical keyboard typing audio |
| `clear` | Clear the terminal screen buffer (`Ctrl + L`) |
| `reboot` | Animate system reboot sequence and reload profile |
| `sudo` | Authentic permission denial response |

---

## 🚀 How to Host This Website

This project is a static web application and can be hosted on any provider in seconds:

### 1. GitHub Pages
1. Push this repository to GitHub.
2. In your repository, go to **Settings** → **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/`.
5. (Optional) In **Custom domain**, add `induwara.me`.

### 2. Vercel
1. Install Vercel CLI (`npm i -g vercel`) or connect your GitHub repo at [vercel.com](https://vercel.com).
2. Run `vercel` in the project root.
3. Deploy instantly with zero configuration.

### 3. Netlify
1. Drag and drop the `InduwaraWeb` folder into [app.netlify.com/drop](https://app.netlify.com/drop), or link your GitHub repo.
2. Publish with default settings.

---

## 🛠️ Customization Guide

- **Personal Information & Files**:
  Open [`js/terminal.js`](file:///Users/induwarajayalath/Projects/InduwaraWeb/js/terminal.js) and edit `configs.getInstance()` or `files.getInstance()` to add or change your files, descriptions, skills, or links.
- **Avatar & Wallpaper**:
  Replace `assets/avatar.jpg` and `assets/wallpaper.jpg` with your own photos anytime.
- **Styling & Themes**:
  Modify CSS variables in [`css/terminal.css`](file:///Users/induwarajayalath/Projects/InduwaraWeb/css/terminal.css) to tweak fonts, colors, or window radius.
