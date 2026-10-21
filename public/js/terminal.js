/**
 * ==========================================================================
 * macOS Terminal Portfolio - Induwara Jayalath
 * Vanilla JavaScript Terminal Engine & Desktop Window Manager
 * ==========================================================================
 */

/**
 * Configs Singleton
 * Preserves the exact user API and defaultOptions while enhancing functionality.
 */
var configs = (function () {
  var instance;
  var Singleton = function (options) {
    var opts = options || Singleton.defaultOptions;
    for (var key in Singleton.defaultOptions) {
      this[key] = opts[key] || Singleton.defaultOptions[key];
    }
  };

  Singleton.defaultOptions = {
    general_help:
      "Below is a list of commands that you can use.\nYou can use autofill by pressing the TAB key, autocompleting if there's only 1 possibility, or showing you a list of possibilities.",

    bio_help: "Display details and biography of Induwara.",
    gui_help: "Toggle the graphical user interface (GUI) portfolio window.",
    ls_help: "List information about files and folders (current directory by default).",
    cat_help: "Read FILE(s) content and print it to the standard output.",
    whoami_help: "Print user name associated with the current effective user ID and client info.",
    date_help: "Print the current system date and time.",
    help_help: "Print this menu.",
    clear_help: "Clear the terminal screen.",
    reboot_help: "Reboot the terminal system.",
    cd_help: "Change the current working directory.",
    mv_help: "Move or rename files.",
    rm_help: "Remove files or directories.",
    rmdir_help: "Remove directory (only works if folder is empty).",
    touch_help: "Change file timestamps. Creates a new empty file if it doesn't exist.",
    sudo_help: "Execute a command as superuser.",
    skills_help: "Display technical skills and proficiency breakdown.",
    contact_help: "Show contact details and direct links.",
    neofetch_help: "Print system specs and stack overview with Apple logo.",
    theme_help: "Change color theme: theme [macos-dark|homebrew|dracula|matrix|solarized|cyberpunk]",
    matrix_help: "Run the interactive Matrix digital rain effect.",
    weather_help: "Display terminal weather forecast report.",
    sound_help: "Toggle mechanical keyboard typing sound effects: sound [on|off]",
    history_help: "Display terminal command history.",

    welcome:
      "IIIIII N     N DDDDD   U     U W       W   AAAAA   RRRRR    AAAAA\n" +
      "  II   NN    N D    D  U     U W   W   W  A     A  R    R  A     A\n" +
      "  II   N N   N D     D U     U W   W   W  AAAAAAA  RRRRR   AAAAAAA\n" +
      "  II   N  N  N D     D U     U  W W W W   A     A  R  R    A     A\n" +
      "  II   N   N N D    D  U     U  W W W W   A     A  R   R   A     A\n" +
      "IIIIII N     N DDDDD    UUUUU    W   W    A     A  R    R  A     A\n\n" +
      "[boot] loading profile... ok\n" +
      "[system] Induwara Jayalath macOS terminal initialized\n" +
      "[system] Type 'help' to print available commands, or click any chip above.\n",

    internet_explorer_warning:
      "NOTE: I see you're using Internet Explorer. This website will not work properly.",
    welcome_file_name: "welcome_message.txt",
    invalid_command_message: "<value>: command not found. Type 'help' for available commands.",
    reboot_message: "Preparing to reboot...\n\n3...\n\n2...\n\n1...\n\nRebooting...\n\n",
    permission_denied_message: "Unable to '<value>', permission denied.",
    sudo_message: "guest is not in the sudoers file. This incident will be reported to Induwara.",
    usage: "Usage",
    file: "file",
    file_not_found: "File '<value>' not found.",
    username: "Username",
    hostname: "Host",
    platform: "Platform",
    accesible_cores: "Accessible cores",
    language: "Language",
    value_token: "<value>",
    host: "induwara.me",
    user: "guest",
    is_root: false,
    type_delay: 5,
  };

  return {
    getInstance: function (options) {
      if (!instance) {
        instance = new Singleton(options);
      }
      return instance;
    },
  };
})();

/**
 * Files Singleton
 * In-memory virtual filesystem with folders, files, and deep links.
 */
var files = (function () {
  var instance;
  var Singleton = function (options) {
    var opts = options || Singleton.defaultOptions;
    for (var key in Singleton.defaultOptions) {
      this[key] = opts[key] || Singleton.defaultOptions[key];
    }
  };

  Singleton.defaultOptions = {
    "contact.txt":
      "Contact me on:\n\n" +
      "Email:    contact@induwara.me\n" +
      "Phone:    076-6449000\n" +
      "Location: Colombo, Sri Lanka\n" +
      "Website:  https://induwara.me\n" +
      "Status:   Available for freelance & full-time engineering roles",

    "facebook.txt": "https://www.facebook.com/induwarajayalath/",
    "instagram.txt": "https://www.instagram.com/induwara.jayalath/",
    "gui.sh": "https://induwara.me/gui",
    "github.txt": "https://github.com/induwarajayalath",
    "linkedin.txt": "https://www.linkedin.com/in/induwarajayalath",

    "skills.txt":
      "=== TECHNICAL SKILLS ===\n\n" +
      "• Frontend:  JavaScript (ES6+), TypeScript, Next.js, HTML5, CSS3/SCSS, Tailwind\n" +
      "• Backend:   Node.js, Express, Python, REST APIs, GraphQL, WebSockets\n" +
      "• Database:  PostgreSQL, MongoDB, MySQL, Redis, Firebase Firestore\n" +
      "• DevOps:    Docker, Git & GitHub Actions, AWS, Linux, Nginx, Vercel\n" +
      "• Tools:     VS Code, Figma, Postman, Vite, Webpack, Jest",

    "welcome_message.txt": configs.getInstance().welcome,
  };

  return {
    getInstance: function (options) {
      if (!instance) {
        instance = new Singleton(options);
      }
      return instance;
    },
  };
})();

/**
 * Audio Synthesizer (Mechanical Keyboard & Terminal Beeps)
 * Uses Web Audio API - no external assets needed!
 */
var TerminalAudio = (function () {
  var audioCtx = null;
  var enabled = false;

  function initAudio() {
    if (!audioCtx) {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playKeyClick() {
    if (!enabled || !audioCtx) return;
    try {
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();

      osc.type = "sine";
      // random micro pitch variation for realistic tactile feel
      osc.frequency.setValueAtTime(600 + Math.random() * 300, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // ignore audio errors
    }
  }

  function playEnterChime() {
    if (!enabled || !audioCtx) return;
    try {
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch (e) { }
  }

  return {
    init: initAudio,
    playKeyClick: playKeyClick,
    playEnterChime: playEnterChime,
    toggle: function () {
      enabled = !enabled;
      if (enabled) initAudio();
      return enabled;
    },
    setEnabled: function (val) {
      enabled = !!val;
      if (enabled) initAudio();
      return enabled;
    },
    isEnabled: function () {
      return enabled;
    },
  };
})();

/**
 * Virtual Filesystem with Folder Hierarchy
 */
var VirtualFileSystem = (function () {
  var vfs = {
    "/": {
      type: "dir",
      children: {
        Users: {
          type: "dir",
          children: {
            guest: {
              type: "dir",
              children: {},
            },
          },
        },
      },
    },
  };

  // Populate guest home folder with default files
  var homeFolder = vfs["/"].children["Users"].children["guest"].children;
  var initialFiles = files.getInstance();
  for (var fname in initialFiles) {
    homeFolder[fname] = {
      type: "file",
      content: initialFiles[fname],
    };
  }

  // Add directories
  homeFolder["documents"] = {
    type: "dir",
    children: {
      "resume.txt": {
        type: "file",
        content: "Induwara Jayalath Resume\nRole: Software Engineer\nExperience: 4+ Years\nContact: contact@induwara.me",
      },
    },
  };

  var currentPath = ["Users", "guest"];

  function getPathString() {
    if (currentPath.length === 2 && currentPath[0] === "Users" && currentPath[1] === "guest") {
      return "~";
    }
    return "/" + currentPath.join("/");
  }

  function getDirNode(pathArr) {
    var node = vfs["/"];
    for (var i = 0; i < pathArr.length; i++) {
      var segment = pathArr[i];
      if (!node.children || !node.children[segment]) {
        return null;
      }
      node = node.children[segment];
    }
    return node;
  }

  function getCurrentDirNode() {
    return getDirNode(currentPath);
  }

  return {
    getCurrentPathString: getPathString,
    getCurrentDirNode: getCurrentDirNode,
    changeDirectory: function (target) {
      if (!target || target === "~") {
        currentPath = ["Users", "guest"];
        return true;
      }
      if (target === "/") {
        currentPath = [];
        return true;
      }
      if (target === "..") {
        if (currentPath.length > 0) {
          currentPath.pop();
        }
        return true;
      }
      if (target === ".") {
        return true;
      }

      var dirNode = getCurrentDirNode();
      if (dirNode && dirNode.children && dirNode.children[target]) {
        if (dirNode.children[target].type === "dir") {
          currentPath.push(target);
          return true;
        } else {
          return "not_a_dir";
        }
      }
      return false;
    },
    listCurrent: function () {
      var dirNode = getCurrentDirNode();
      if (!dirNode || !dirNode.children) return [];
      var res = [];
      for (var name in dirNode.children) {
        res.push({
          name: name,
          type: dirNode.children[name].type,
          content: dirNode.children[name].content || "",
        });
      }
      return res;
    },
    getFile: function (filename) {
      var dirNode = getCurrentDirNode();
      if (dirNode && dirNode.children && dirNode.children[filename]) {
        return dirNode.children[filename];
      }
      return null;
    },
    touch: function (filename) {
      var dirNode = getCurrentDirNode();
      if (!dirNode) return false;
      if (!dirNode.children[filename]) {
        dirNode.children[filename] = {
          type: "file",
          content: "",
        };
      }
      return true;
    },
    mkdir: function (dirname) {
      var dirNode = getCurrentDirNode();
      if (!dirNode) return false;
      if (dirNode.children[dirname]) {
        return "exists";
      }
      dirNode.children[dirname] = {
        type: "dir",
        children: {},
      };
      return true;
    },
    rm: function (name) {
      var dirNode = getCurrentDirNode();
      if (!dirNode || !dirNode.children || !dirNode.children[name]) {
        return false;
      }
      delete dirNode.children[name];
      return true;
    },
    mv: function (src, dest) {
      var dirNode = getCurrentDirNode();
      if (!dirNode || !dirNode.children || !dirNode.children[src]) {
        return false;
      }
      dirNode.children[dest] = dirNode.children[src];
      delete dirNode.children[src];
      return true;
    },
  };
})();

/**
 * Terminal UI & Command Processor
 */
var main = (function () {
  var cfg = configs.getInstance();

  var isUsingIE =
    window.navigator.userAgent.indexOf("MSIE ") > 0 ||
    !!navigator.userAgent.match(/Trident.*rv\:11\./);

  var isURL = function (str) {
    if (!str || typeof str !== "string") return false;
    var trimmed = str.trim();
    return (
      (trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("www.")) &&
      trimmed.indexOf(" ") === -1 &&
      trimmed.indexOf("\n") === -1
    );
  };

  // DOM Elements
  var terminalScreen = document.getElementById("terminal-screen");
  var terminalOutput = document.getElementById("terminal-output");
  var commandInput = document.getElementById("command-input");
  var inputMirror = document.getElementById("input-mirror");
  var ghostSuggestion = document.getElementById("ghost-suggestion");
  var promptPath = document.getElementById("prompt-path");
  var clockElem = document.getElementById("live-clock");
  var matrixCanvas = document.getElementById("matrix-canvas");
  var terminalWindow = document.getElementById("terminal-window");
  var guiWindow = document.getElementById("gui-window");
  var aboutMacModal = document.getElementById("about-mac-modal");
  var controlCenterModal = document.getElementById("control-center-modal");

  // State
  var commandHistory = [];
  var historyIndex = -1;
  var currentInputDraft = "";
  var matrixInterval = null;

  var allCommands = [
    "help",
    "bio",
    "gui",
    "ls",
    "cat",
    "whoami",
    "date",
    "clear",
    "reboot",
    "cd",
    "pwd",
    "mv",
    "rm",
    "rmdir",
    "touch",
    "mkdir",
    "echo",
    "sudo",
    "skills",
    "contact",
    "socials",
    "neofetch",
    "theme",
    "wallpaper",
    "matrix",
    "cowsay",
    "weather",
    "sound",
    "history",
  ];

  // Technical skills data
  var skillsData = [
    { name: "JavaScript / ES6+", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "React / Next.js", level: 92 },
    { name: "Node.js & Express", level: 88 },
    { name: "HTML5 / Modern CSS", level: 96 },
    { name: "PostgreSQL / SQL", level: 85 },
    { name: "Python", level: 82 },
    { name: "Docker & Cloud (AWS)", level: 80 },
  ];

  function updatePromptPath() {
    if (promptPath) {
      promptPath.textContent = VirtualFileSystem.getCurrentPathString();
    }
  }

  function scrollToBottom() {
    if (terminalScreen) {
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }
  }

  function updateLiveClock() {
    if (!clockElem) return;
    var now = new Date();
    var options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    clockElem.textContent = now.toLocaleDateString("en-US", options).replace(/,/g, "");
  }

  function focusInput() {
    if (commandInput) {
      commandInput.focus();
    }
  }

  // Print welcome banner
  function printWelcomeBanner() {
    var banner = document.createElement("div");
    banner.className = "ascii-banner";
    banner.textContent =
      "IIIIII N     N DDDDD   U     U W       W   AAAAA   RRRRR    AAAAA\n" +
      "  II   NN    N D    D  U     U W   W   W  A     A  R    R  A     A\n" +
      "  II   N N   N D     D U     U W   W   W  AAAAAAA  RRRRR   AAAAAAA\n" +
      "  II   N  N  N D     D U     U  W W W W   A     A  R  R    A     A\n" +
      "  II   N   N N D    D  U     U  W W W W   A     A  R   R   A     A\n" +
      "IIIIII N     N DDDDD    UUUUU    W   W    A     A  R    R  A     A";

    var bootLog = document.createElement("div");
    bootLog.className = "boot-log";
    bootLog.innerHTML =
      '<div class="boot-item"><span class="boot-tag">[boot]</span> <span>loading profile... ok</span></div>' +
      '<div class="boot-item"><span class="boot-tag">[system]</span> <span>Induwara Jayalath terminal initialized</span></div>' +
      '<div class="boot-item"><span class="boot-tag info">[hint]</span> <span>Type <strong style="color:var(--accent-green); cursor:pointer;" onclick="main.executeCommand(\'help\')">help</strong> to view commands or tap the quick chips above.</span></div>';

    terminalOutput.appendChild(banner);
    terminalOutput.appendChild(bootLog);
    scrollToBottom();
  }

  // Append command execution to history display
  function logCommandOutput(cmdText, responseHtml) {
    var group = document.createElement("div");
    group.className = "terminal-output-group";

    var cmdLine = document.createElement("div");
    cmdLine.className = "command-line-history";
    cmdLine.innerHTML =
      '<span class="prompt-badge">' +
      '<span class="prompt-user">' +
      cfg.user +
      "</span>" +
      '<span style="color:var(--text-dim)">@</span>' +
      '<span class="prompt-host">' +
      cfg.host +
      "</span> " +
      '<span class="prompt-path">' +
      VirtualFileSystem.getCurrentPathString() +
      "</span> " +
      '<span class="prompt-char">%</span>' +
      "</span> " +
      '<span class="command-text">' +
      escapeHtml(cmdText) +
      "</span>";

    var resLine = document.createElement("div");
    resLine.className = "command-response";
    resLine.innerHTML = responseHtml;

    group.appendChild(cmdLine);
    group.appendChild(resLine);
    terminalOutput.appendChild(group);

    scrollToBottom();
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Command handlers
  var commandHandlers = {
    help: function () {
      var html =
        '<div style="margin-bottom:8px; color:var(--text-dim);">' +
        cfg.general_help.replace(/\n/g, "<br>") +
        "</div>" +
        '<table class="response-table">' +
        "<thead><tr><th>Command</th><th>Description</th></tr></thead>" +
        "<tbody>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'bio\')">bio</span></td><td>' +
        cfg.bio_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'skills\')">skills</span></td><td>' +
        cfg.skills_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'contact\')">contact</span></td><td>' +
        cfg.contact_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'gui\')">gui</span></td><td>' +
        cfg.gui_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'neofetch\')">neofetch</span></td><td>' +
        cfg.neofetch_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'ls\')">ls</span></td><td>' +
        cfg.ls_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'cat contact.txt\')">cat &lt;file&gt;</span></td><td>' +
        cfg.cat_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'cd documents\')">cd &lt;dir&gt;</span></td><td>' +
        cfg.cd_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'whoami\')">whoami</span></td><td>' +
        cfg.whoami_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'date\')">date</span></td><td>' +
        cfg.date_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'theme\')">theme</span></td><td>' +
        cfg.theme_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'matrix\')">matrix</span></td><td>' +
        cfg.matrix_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'weather\')">weather</span></td><td>' +
        cfg.weather_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'sound\')">sound</span></td><td>' +
        cfg.sound_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'clear\')">clear</span></td><td>' +
        cfg.clear_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'reboot\')">reboot</span></td><td>' +
        cfg.reboot_help +
        "</td></tr>" +
        '<tr><td><span class="cmd-badge" onclick="main.executeCommand(\'sudo\')">sudo</span></td><td>' +
        cfg.sudo_help +
        "</td></tr>" +
        "</tbody></table>";
      return html;
    },

    bio: function () {
      return (
        '<div class="bio-card">' +
        '<img src="assets/avatar.jpg" alt="Induwara Jayalath" class="bio-avatar" onerror="this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%2338bdf8%22/><text x=%2250%22 y=%2258%22 font-size=%2235%22 font-family=%22sans-serif%22 font-weight=%22bold%22 text-anchor=%22middle%22 fill=%22white%22>IJ</text></svg>\'">' +
        '<div class="bio-content">' +
        '<div class="bio-name">Induwara Jayalath</div>' +
        '<div class="bio-role">Lead System Engineer & an Educator</div>' +
        '<div class="bio-desc">Passionate creator focusing on crafting scalable web applications, sleek interactive interfaces, and robust cloud services. Based in Sri Lanka, working with modern JavaScript/TypeScript, and Python.</div>' +
        '<div class="bio-tags">' +
        '<span class="bio-tag">📍 Colombo, LK</span>' +
        '<span class="bio-tag">💻 Systems</span>' +
        '<span class="bio-tag">⚡ Linux / Redhat / WSO2</span>' +
        '<span class="bio-tag">🚀 Cloud Systems</span>' +
        '<span class="bio-tag">🌱 Open Source</span>' +
        "</div>" +
        "</div>" +
        "</div>"
      );
    },

    whoami: function () {
      var cores = navigator.hardwareConcurrency || "4";
      var platform = navigator.platform || "macOS";
      var lang = navigator.language || "en-US";
      return (
        '<div style="line-height:1.7;">' +
        '<div><strong style="color:var(--accent-cyan);">' +
        cfg.username +
        ":</strong> " +
        cfg.user +
        " (uid=501, gid=20, staff, visitor)</div>" +
        '<div><strong style="color:var(--accent-cyan);">' +
        cfg.hostname +
        ":</strong> " +
        cfg.host +
        "</div>" +
        '<div><strong style="color:var(--accent-cyan);">' +
        cfg.platform +
        ":</strong> " +
        platform +
        "</div>" +
        '<div><strong style="color:var(--accent-cyan);">' +
        cfg.accesible_cores +
        ":</strong> " +
        cores +
        "</div>" +
        '<div><strong style="color:var(--accent-cyan);">' +
        cfg.language +
        ":</strong> " +
        lang +
        "</div>" +
        "</div>"
      );
    },

    date: function () {
      return "<div>" + new Date().toString() + "</div>";
    },

    clear: function () {
      terminalOutput.innerHTML = "";
      return "";
    },

    reboot: function () {
      var lines = cfg.reboot_message.split("\n\n");
      var idx = 0;
      var interval = setInterval(function () {
        if (idx < lines.length) {
          if (lines[idx].trim()) {
            var el = document.createElement("div");
            el.style.color = "var(--accent-yellow)";
            el.textContent = lines[idx];
            terminalOutput.appendChild(el);
            scrollToBottom();
          }
          idx++;
        } else {
          clearInterval(interval);
          setTimeout(function () {
            terminalOutput.innerHTML = "";
            printWelcomeBanner();
          }, 800);
        }
      }, 500);
      return "";
    },

    sudo: function () {
      return (
        '<div style="color:var(--accent-red);">' +
        cfg.sudo_message +
        "</div>"
      );
    },

    gui: function () {
      main.toggleGuiWindow();
      return '<div style="color:var(--accent-green);">Opened macOS Portfolio GUI Window. Switch between CLI and GUI anytime!</div>';
    },

    ls: function (args) {
      var showAll = args.indexOf("-a") !== -1 || args.indexOf("-la") !== -1 || args.indexOf("-al") !== -1;
      var items = VirtualFileSystem.listCurrent();
      var html = '<div class="file-list-grid">';

      if (showAll) {
        html += '<div class="file-item directory">📁 .</div>';
        html += '<div class="file-item directory">📁 ..</div>';
      }

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.type === "dir") {
          html +=
            '<div class="file-item directory" onclick="main.executeCommand(\'cd ' +
            item.name +
            "')\">📁 " +
            item.name +
            "/</div>";
        } else if (item.name.endsWith(".sh")) {
          html +=
            '<div class="file-item executable" onclick="main.executeCommand(\'cat ' +
            item.name +
            "')\">⚙️ " +
            item.name +
            "*</div>";
        } else if (item.name.endsWith(".txt") || item.name.endsWith(".md")) {
          html +=
            '<div class="file-item text" onclick="main.executeCommand(\'cat ' +
            item.name +
            "')\">📄 " +
            item.name +
            "</div>";
        } else {
          html +=
            '<div class="file-item link" onclick="main.executeCommand(\'cat ' +
            item.name +
            "')\">🔗 " +
            item.name +
            "</div>";
        }
      }
      html += "</div>";
      return html;
    },

    pwd: function () {
      return "<div>" + VirtualFileSystem.getCurrentPathString() + "</div>";
    },

    cd: function (args) {
      var target = (args[0] || "").trim();
      var res = VirtualFileSystem.changeDirectory(target);
      if (res === true) {
        updatePromptPath();
        return "";
      } else if (res === "not_a_dir") {
        return '<div style="color:var(--accent-red);">cd: ' + escapeHtml(target) + ': Not a directory</div>';
      } else {
        return '<div style="color:var(--accent-red);">cd: ' + escapeHtml(target) + ': No such file or directory</div>';
      }
    },

    cat: function (args) {
      if (!args || args.length === 0) {
        return '<div style="color:var(--accent-yellow);">Usage: cat &lt;filename&gt;</div>';
      }
      var filename = args[0].trim();
      var fileObj = VirtualFileSystem.getFile(filename);
      if (!fileObj) {
        return '<div style="color:var(--accent-red);">' + cfg.file_not_found.replace(cfg.value_token, filename) + "</div>";
      }

      var content = fileObj.content;
      if (isURL(content)) {
        var url = content.trim();
        return (
          '<div style="margin:8px 0; padding:10px 14px; background:rgba(255,255,255,0.05); border-radius:6px; border-left:3px solid var(--accent-cyan);">' +
          '<div style="color:var(--text-dim); margin-bottom:4px;">External Link detected:</div>' +
          '<div style="margin-bottom:8px;"><a href="' +
          url +
          '" target="_blank" rel="noopener noreferrer" style="color:var(--accent-cyan); font-weight:600; text-decoration:underline;">' +
          url +
          " ↗</a></div>" +
          '<button class="window-btn-icon" onclick="window.open(\'' +
          url +
          "', '_blank')\">Open Link in New Tab ↗</button>" +
          "</div>"
        );
      }

      return (
        '<div style="white-space:pre-wrap; line-height:1.55; color:var(--text-main); margin:4px 0;">' +
        escapeHtml(content) +
        "</div>"
      );
    },

    touch: function (args) {
      if (!args || args.length === 0) {
        return '<div style="color:var(--accent-yellow);">Usage: touch &lt;filename&gt;</div>';
      }
      var name = args[0].trim();
      VirtualFileSystem.touch(name);
      return '<div style="color:var(--accent-green);">File \'' + escapeHtml(name) + '\' touched/created.</div>';
    },

    mkdir: function (args) {
      if (!args || args.length === 0) {
        return '<div style="color:var(--accent-yellow);">Usage: mkdir &lt;dirname&gt;</div>';
      }
      var name = args[0].trim();
      var res = VirtualFileSystem.mkdir(name);
      if (res === "exists") {
        return '<div style="color:var(--accent-red);">mkdir: ' + escapeHtml(name) + ': File or directory already exists</div>';
      }
      return '<div style="color:var(--accent-green);">Directory \'' + escapeHtml(name) + '\' created.</div>';
    },

    rm: function (args) {
      if (!args || args.length === 0) {
        return '<div style="color:var(--accent-yellow);">Usage: rm &lt;filename&gt;</div>';
      }
      var name = args[0].trim();
      var res = VirtualFileSystem.rm(name);
      if (!res) {
        return '<div style="color:var(--accent-red);">rm: ' + escapeHtml(name) + ': No such file or directory</div>';
      }
      return '<div style="color:var(--accent-dim);">Removed \'' + escapeHtml(name) + '\'</div>';
    },

    rmdir: function (args) {
      return commandHandlers.rm(args);
    },

    mv: function (args) {
      if (!args || args.length < 2) {
        return '<div style="color:var(--accent-yellow);">Usage: mv &lt;source&gt; &lt;destination&gt;</div>';
      }
      var src = args[0].trim();
      var dest = args[1].trim();
      var res = VirtualFileSystem.mv(src, dest);
      if (!res) {
        return '<div style="color:var(--accent-red);">mv: cannot stat \'' + escapeHtml(src) + '\': No such file or directory</div>';
      }
      return '<div style="color:var(--accent-green);">Renamed \'' + escapeHtml(src) + '\' -> \'' + escapeHtml(dest) + '\'</div>';
    },

    echo: function (args) {
      var raw = args.join(" ");
      var redirectIdx = raw.indexOf(">");
      if (redirectIdx !== -1) {
        var text = raw.substring(0, redirectIdx).trim().replace(/^["']|["']$/g, "");
        var targetFile = raw.substring(redirectIdx + 1).trim();
        if (targetFile) {
          VirtualFileSystem.touch(targetFile);
          var fileObj = VirtualFileSystem.getFile(targetFile);
          if (fileObj) fileObj.content = text;
          return '<div style="color:var(--accent-green);">Written to ' + escapeHtml(targetFile) + "</div>";
        }
      }
      return "<div>" + escapeHtml(raw.replace(/^["']|["']$/g, "")) + "</div>";
    },

    skills: function () {
      var html = '<div class="skills-container">';
      html += '<div style="color:var(--accent-cyan); font-weight:700; margin-bottom:4px;">Technical Proficiency Breakdown:</div>';
      for (var i = 0; i < skillsData.length; i++) {
        var s = skillsData[i];
        html +=
          '<div class="skill-bar-row">' +
          '<div class="skill-name">' +
          s.name +
          "</div>" +
          '<div class="skill-bar-outer"><div class="skill-bar-inner" style="width:' +
          s.level +
          '%;"></div></div>' +
          '<div class="skill-level-text">' +
          s.level +
          "%</div>" +
          "</div>";
      }
      html += "</div>";
      return html;
    },

    contact: function () {
      return (
        '<div class="contact-terminal-box">' +
        '<div style="font-weight:700; color:var(--text-bright); margin-bottom:4px;">📬 Connect with Induwara Jayalath</div>' +
        '<div class="contact-row"><span class="contact-label">Email:</span> <a href="mailto:contact@induwara.me" class="contact-link">contact@induwara.me</a> <button class="copy-btn" onclick="main.copyText(\'contact@induwara.me\')">Copy</button></div>' +
        '<div class="contact-row"><span class="contact-label">Phone:</span> <a href="tel:0766449000" class="contact-link">076-6449000</a> <button class="copy-btn" onclick="main.copyText(\'076-6449000\')">Copy</button></div>' +
        '<div class="contact-row"><span class="contact-label">Location:</span> <span style="color:var(--text-main);">Colombo, Sri Lanka 🇱🇰</span></div>' +
        '<div class="contact-row"><span class="contact-label">Website:</span> <a href="https://induwara.me" target="_blank" class="contact-link">https://induwara.me</a></div>' +
        '<div class="contact-row"><span class="contact-label">Socials:</span> ' +
        '<a href="https://github.com/induwarajayalath" target="_blank" class="contact-link" style="margin-right:10px;">GitHub</a>' +
        '<a href="https://www.facebook.com/induwarajayalath/" target="_blank" class="contact-link" style="margin-right:10px;">Facebook</a>' +
        '<a href="https://www.instagram.com/induwara.jayalath/" target="_blank" class="contact-link">Instagram</a>' +
        "</div>" +
        "</div>"
      );
    },

    socials: function () {
      return (
        '<div style="display:flex; flex-direction:column; gap:6px; margin:6px 0;">' +
        '<div>🌐 <strong>Facebook:</strong> <a href="https://www.facebook.com/induwarajayalath/" target="_blank" style="color:var(--accent-cyan);">facebook.com/induwarajayalath</a></div>' +
        '<div>📸 <strong>Instagram:</strong> <a href="https://www.instagram.com/induwara.jayalath/" target="_blank" style="color:var(--accent-pink);">instagram.com/induwara.jayalath</a></div>' +
        '<div>🐙 <strong>GitHub:</strong> <a href="https://github.com/induwarajayalath" target="_blank" style="color:var(--accent-green);">github.com/induwarajayalath</a></div>' +
        '</div>'
      );
    },

    neofetch: function () {
      var logo =
        "                    'c.\n" +
        "                 'kKMM0.\n" +
        "                .NMMMMO\n" +
        "               .kMMMMM:\n" +
        "             .oNMMMMMo\n" +
        "           .lXMMMMMMl\n" +
        "         .oXMMMMMMd.\n" +
        "       .lWMMMMMMX'\n" +
        "     .oWMMMMMMW'\n" +
        "    :KMMMMMMK'\n" +
        "   :WMMMMMMK.\n" +
        "   .kMMMMMMO\n" +
        "     ;KMMMMWd\n" +
        "       ,d0XMMM0c.\n" +
        "          .;d0XMWx.";

      return (
        '<div class="neofetch-container">' +
        '<div class="neofetch-logo">' +
        logo +
        "</div>" +
        '<div class="neofetch-info">' +
        '<div class="neofetch-header">induwara@MacBook-Pro-16</div>' +
        '<div class="neofetch-row"><span class="neofetch-label">OS:</span> <span class="neofetch-val">macOS Sequoia 15.1 (24B83)</span></div>' +
        '<div class="neofetch-row"><span class="neofetch-label">Host:</span> <span class="neofetch-val">MacBook Pro (16-inch, Nov 2024)</span></div>' +
        '<div class="neofetch-row"><span class="neofetch-label">Kernel:</span> <span class="neofetch-val">Darwin 24.1.0</span></div>' +
        '<div class="neofetch-row"><span class="neofetch-label">Uptime:</span> <span class="neofetch-val">14 days, 3 hours</span></div>' +
        '<div class="neofetch-row"><span class="neofetch-label">Shell:</span> <span class="neofetch-val">zsh 5.9 (x86_64-apple-darwin24.0)</span></div>' +
        '<div class="neofetch-row"><span class="neofetch-label">Resolution:</span> <span class="neofetch-val">' +
        window.innerWidth +
        "x" +
        window.innerHeight +
        "</span></div>" +
        '<div class="neofetch-row"><span class="neofetch-label">DE:</span> <span class="neofetch-val">Aqua / Metal</span></div>' +
        '<div class="neofetch-row"><span class="neofetch-label">CPU:</span> <span class="neofetch-val">Apple M3 Max (16 cores)</span></div>' +
        '<div class="neofetch-row"><span class="neofetch-label">Memory:</span> <span class="neofetch-val">36 GB Unified Memory</span></div>' +
        '<div class="neofetch-row"><span class="neofetch-label">Portfolio:</span> <span class="neofetch-val" style="color:var(--accent-green);">Induwara Jayalath Edition</span></div>' +
        "</div>" +
        "</div>"
      );
    },

    theme: function (args) {
      var themes = ["macos-dark", "homebrew", "dracula", "matrix", "solarized", "cyberpunk"];
      var themeName = (args[0] || "").toLowerCase().trim();
      if (!themeName || themes.indexOf(themeName) === -1) {
        return (
          '<div style="color:var(--accent-yellow);">Available themes: ' +
          themes.map(function (t) {
            return '<span class="cmd-badge" onclick="main.executeCommand(\'theme ' + t + "')\">" + t + "</span>";
          }).join(" ") +
          "</div>"
        );
      }
      document.body.setAttribute("data-theme", themeName);
      return '<div style="color:var(--accent-green);">Theme switched to <strong>' + themeName + "</strong></div>";
    },

    wallpaper: function (args) {
      var wallpapers = {
        sequoia: "assets/wallpaper.jpg",
        dark: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",
        nebula: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80",
        minimal: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
      };
      var name = (args[0] || "").toLowerCase().trim();
      if (!name || !wallpapers[name]) {
        return (
          '<div style="color:var(--accent-yellow);">Available wallpapers: ' +
          Object.keys(wallpapers)
            .map(function (w) {
              return '<span class="cmd-badge" onclick="main.executeCommand(\'wallpaper ' + w + "')\">" + w + "</span>";
            })
            .join(" ") +
          "</div>"
        );
      }
      var desktop = document.getElementById("desktop");
      desktop.style.backgroundImage = "url('" + wallpapers[name] + "')";
      return '<div style="color:var(--accent-green);">Desktop wallpaper changed to <strong>' + name + "</strong></div>";
    },

    matrix: function () {
      main.startMatrixRain();
      return '<div style="color:var(--accent-green);">Matrix Digital Rain started! Click the screen or press any key to exit.</div>';
    },

    cowsay: function (args) {
      var msg = args.join(" ") || "Induwara's Terminal is awesome!";
      var border = "-".repeat(msg.length + 2);
      var cow =
        " " +
        border +
        "\n" +
        "< " +
        msg +
        " >\n" +
        " " +
        border +
        "\n" +
        "        \\   ^__^\n" +
        "         \\  (oo)\\_______\n" +
        "            (__)\\       )\\/\\\n" +
        "                ||----w |\n" +
        "                ||     ||\n";
      return '<div style="white-space:pre; color:var(--accent-green); font-family:var(--font-mono);">' + escapeHtml(cow) + "</div>";
    },

    weather: function (args) {
      var city = args[0] || "Colombo";
      return (
        '<div style="padding:10px; background:rgba(255,255,255,0.04); border-radius:6px; max-width:400px;">' +
        '<div style="color:var(--accent-cyan); font-weight:700;">Weather report: ' +
        escapeHtml(city) +
        "</div>" +
        '<div style="color:var(--text-main); margin-top:4px;">⛅ Partly Cloudy, 29°C (84°F)</div>' +
        '<div style="color:var(--text-dim); font-size:12px;">Humidity: 74% | Wind: 14 km/h SW | Forecast: Clear skies</div>' +
        "</div>"
      );
    },

    sound: function (args) {
      var state = (args[0] || "").toLowerCase().trim();
      var enabled;
      if (state === "on") {
        enabled = TerminalAudio.setEnabled(true);
      } else if (state === "off") {
        enabled = TerminalAudio.setEnabled(false);
      } else {
        enabled = TerminalAudio.toggle();
      }
      return (
        '<div style="color:var(--accent-cyan);">Mechanical keyboard audio is now: <strong>' +
        (enabled ? "ENABLED 🔊" : "DISABLED 🔇") +
        "</strong></div>"
      );
    },

    history: function () {
      var html = '<div style="line-height:1.6;">';
      for (var i = 0; i < commandHistory.length; i++) {
        html += '<div style="color:var(--text-dim);">' + (i + 1) + "  " + escapeHtml(commandHistory[i]) + "</div>";
      }
      html += "</div>";
      return html;
    },
  };

  // Process input
  function executeCommand(inputStr) {
    var raw = (inputStr || "").trim();
    if (!raw) {
      logCommandOutput("", "");
      return;
    }

    commandHistory.push(raw);
    historyIndex = commandHistory.length;

    var parts = raw.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    var args = parts.slice(1);

    TerminalAudio.playEnterChime();

    if (commandHandlers[cmd]) {
      var result = commandHandlers[cmd](args);
      if (result !== "") {
        logCommandOutput(raw, result);
      }
    } else {
      var msg = cfg.invalid_command_message.replace(cfg.value_token, escapeHtml(cmd));
      logCommandOutput(raw, '<div style="color:var(--accent-red);">' + msg + "</div>");
    }

    if (commandInput) {
      commandInput.value = "";
      updateInputMirror("");
    }
  }

  // Update input mirror & ghost suggestion
  function updateInputMirror(val) {
    if (inputMirror) {
      inputMirror.textContent = val;
    }

    var ghost = "";
    if (val && val.trim().length > 0) {
      var lower = val.toLowerCase();
      for (var i = 0; i < allCommands.length; i++) {
        if (allCommands[i].startsWith(lower) && allCommands[i] !== lower) {
          ghost = allCommands[i].substring(lower.length);
          break;
        }
      }
    }
    if (ghostSuggestion) {
      ghostSuggestion.textContent = ghost;
    }
  }

  // Matrix Rain Animation
  function startMatrixRain() {
    if (!matrixCanvas) return;
    matrixCanvas.classList.add("active");
    var ctx = matrixCanvas.getContext("2d");
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    var chars = "0123456789ABCDEF@#$%&*+-=~|INDUWARAJAYALATH";
    var fontSize = 16;
    var columns = Math.floor(matrixCanvas.width / fontSize);
    var drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50;
    }

    if (matrixInterval) clearInterval(matrixInterval);
    matrixInterval = setInterval(function () {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

      ctx.fillStyle = "#22c55e";
      ctx.font = fontSize + "px monospace";

      for (var j = 0; j < drops.length; j++) {
        var text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, j * fontSize, drops[j] * fontSize);

        if (drops[j] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[j] = 0;
        }
        drops[j]++;
      }
    }, 33);
  }

  function stopMatrixRain() {
    if (matrixInterval) {
      clearInterval(matrixInterval);
      matrixInterval = null;
    }
    if (matrixCanvas) {
      matrixCanvas.classList.remove("active");
      var ctx = matrixCanvas.getContext("2d");
      ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    }
  }

  // Window Management
  function initWindowManager() {
    // Traffic light buttons for Terminal Window
    var closeBtn = document.getElementById("term-close-btn");
    var minBtn = document.getElementById("term-min-btn");
    var maxBtn = document.getElementById("term-max-btn");
    var dockTermItem = document.getElementById("dock-terminal");

    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        terminalOutput.innerHTML =
          '<div style="color:var(--accent-red); margin:20px 0; text-align:center;">' +
          "[Process completed]<br><br>" +
          '<button class="cmd-badge" onclick="main.restartSession()">Click here to restart terminal</button>' +
          "</div>";
      });
    }

    if (minBtn) {
      minBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        terminalWindow.classList.add("minimized");
        if (dockTermItem) dockTermItem.classList.remove("running");
      });
    }

    if (maxBtn) {
      maxBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        terminalWindow.classList.toggle("maximized");
      });
    }

    // Draggable Window Headers
    makeDraggable(terminalWindow, document.getElementById("terminal-header"));
    makeDraggable(guiWindow, document.getElementById("gui-header"));

    // Dock Items
    if (dockTermItem) {
      dockTermItem.addEventListener("click", function () {
        terminalWindow.classList.remove("minimized");
        bringToFront(terminalWindow);
        dockTermItem.classList.add("running");
        focusInput();
      });
    }

    var dockFinder = document.getElementById("dock-finder");
    if (dockFinder) {
      dockFinder.addEventListener("click", function () {
        main.toggleGuiWindow();
      });
    }

    var dockMail = document.getElementById("dock-mail");
    if (dockMail) {
      dockMail.addEventListener("click", function () {
        terminalWindow.classList.remove("minimized");
        bringToFront(terminalWindow);
        main.executeCommand("contact");
      });
    }

    var dockSettings = document.getElementById("dock-settings");
    if (dockSettings) {
      dockSettings.addEventListener("click", function () {
        main.toggleControlCenter();
      });
    }

    var dockTrash = document.getElementById("dock-trash");
    if (dockTrash) {
      dockTrash.addEventListener("click", function () {
        main.executeCommand("clear");
      });
    }
  }

  function makeDraggable(win, header) {
    if (!win || !header) return;
    var isDragging = false;
    var startX, startY, initialLeft, initialTop;

    header.addEventListener("mousedown", function (e) {
      if (e.target.closest(".traffic-btn") || e.target.closest(".window-btn-icon")) return;
      if (win.classList.contains("maximized")) return;

      isDragging = true;
      bringToFront(win);
      startX = e.clientX;
      startY = e.clientY;

      var rect = win.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      function onMouseMove(moveEvent) {
        if (!isDragging) return;
        var dx = moveEvent.clientX - startX;
        var dy = moveEvent.clientY - startY;

        var newLeft = Math.max(0, Math.min(window.innerWidth - 100, initialLeft + dx));
        var newTop = Math.max(30, Math.min(window.innerHeight - 100, initialTop + dy));

        win.style.left = newLeft + "px";
        win.style.top = newTop + "px";
        win.style.transform = "none";
      }

      function onMouseUp() {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }

  function bringToFront(win) {
    if (terminalWindow) terminalWindow.classList.remove("active-window");
    if (guiWindow) guiWindow.classList.remove("active-window");
    if (win) win.classList.add("active-window");
  }

  // GUI Window Toggle & Tab switching
  function toggleGuiWindow() {
    if (!guiWindow) return;
    var isOpen = guiWindow.classList.contains("open");
    var dockFinder = document.getElementById("dock-finder");
    if (isOpen) {
      guiWindow.classList.remove("open");
      if (dockFinder) dockFinder.classList.remove("running");
    } else {
      guiWindow.classList.add("open");
      bringToFront(guiWindow);
      if (dockFinder) dockFinder.classList.add("running");
    }
  }

  function switchGuiTab(tabId) {
    var navItems = document.querySelectorAll(".sidebar-nav-item");
    for (var i = 0; i < navItems.length; i++) {
      navItems[i].classList.remove("active");
    }

    var clickedNav = document.getElementById("gui-nav-" + tabId);
    if (clickedNav) clickedNav.classList.add("active");

    var tabPanels = document.querySelectorAll(".gui-tab-panel");
    for (var j = 0; j < tabPanels.length; j++) {
      tabPanels[j].classList.remove("active");
    }

    var targetPanel = document.getElementById("gui-panel-" + tabId);
    if (targetPanel) targetPanel.classList.add("active");
  }

  // Modal Dialogs
  function toggleAboutMac() {
    if (!aboutMacModal) return;
    aboutMacModal.classList.toggle("open");
  }

  function toggleControlCenter() {
    if (!controlCenterModal) return;
    controlCenterModal.classList.toggle("open");
  }

  // Copy helper
  function copyText(str) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str).then(function () {
        alert("Copied to clipboard: " + str);
      });
    } else {
      prompt("Copy to clipboard: Ctrl+C, Enter", str);
    }
  }

  // Dropdown menus
  function initDropdownMenus() {
    var menuItems = document.querySelectorAll(".menubar-item[data-dropdown]");
    menuItems.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.stopPropagation();
        var dropdownId = item.getAttribute("data-dropdown");
        var dropdown = document.getElementById(dropdownId);
        var wasOpen = dropdown && dropdown.classList.contains("show");

        document.querySelectorAll(".menu-dropdown").forEach(function (d) {
          d.classList.remove("show");
        });
        menuItems.forEach(function (m) {
          m.classList.remove("active");
        });

        if (dropdown && !wasOpen) {
          dropdown.classList.add("show");
          item.classList.add("active");
        }
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".menubar-item") && !e.target.closest(".menu-dropdown")) {
        document.querySelectorAll(".menu-dropdown").forEach(function (d) {
          d.classList.remove("show");
        });
        menuItems.forEach(function (m) {
          m.classList.remove("active");
        });
      }
      if (matrixCanvas && matrixCanvas.classList.contains("active")) {
        stopMatrixRain();
      }
      if (aboutMacModal && !e.target.closest("#about-mac-modal") && !e.target.closest('[onclick*="toggleAboutMac"]')) {
        aboutMacModal.classList.remove("open");
      }
      if (controlCenterModal && !e.target.closest("#control-center-modal") && !e.target.closest('[onclick*="toggleControlCenter"]')) {
        controlCenterModal.classList.remove("open");
      }
    });
  }

  // Keyboard Event Handlers
  function initKeyboardEvents() {
    if (!commandInput) return;

    commandInput.addEventListener("input", function (e) {
      updateInputMirror(commandInput.value);
      TerminalAudio.playKeyClick();
    });

    commandInput.addEventListener("keydown", function (e) {
      TerminalAudio.init();

      // Exit matrix if active
      if (matrixCanvas && matrixCanvas.classList.contains("active")) {
        stopMatrixRain();
        e.preventDefault();
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        var val = commandInput.value;
        executeCommand(val);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          if (historyIndex === -1 || historyIndex === commandHistory.length) {
            currentInputDraft = commandInput.value;
          }
          if (historyIndex > 0) {
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
            updateInputMirror(commandInput.value);
          }
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex !== -1 && historyIndex < commandHistory.length - 1) {
          historyIndex++;
          commandInput.value = commandHistory[historyIndex];
          updateInputMirror(commandInput.value);
        } else if (historyIndex === commandHistory.length - 1) {
          historyIndex = commandHistory.length;
          commandInput.value = currentInputDraft;
          updateInputMirror(commandInput.value);
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        handleTabCompletion();
      } else if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        logCommandOutput(commandInput.value + "^C", "");
        commandInput.value = "";
        updateInputMirror("");
      } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        commandHandlers.clear();
      }
    });

    // Auto-focus input when clicking terminal screen
    if (terminalScreen) {
      terminalScreen.addEventListener("click", function () {
        focusInput();
      });
    }
  }

  // Tab autocompletion
  function handleTabCompletion() {
    var val = commandInput.value.trim();
    if (!val) return;

    var parts = val.split(/\s+/);
    if (parts.length === 1) {
      var candidate = parts[0].toLowerCase();
      var matches = allCommands.filter(function (c) {
        return c.startsWith(candidate);
      });

      if (matches.length === 1) {
        commandInput.value = matches[0] + " ";
        updateInputMirror(commandInput.value);
      } else if (matches.length > 1) {
        var matchHtml =
          '<div style="color:var(--accent-cyan); margin:6px 0;">' +
          matches
            .map(function (m) {
              return '<span class="cmd-badge" onclick="main.setAndRunInput(\'' + m + "')\">" + m + "</span>";
            })
            .join("  ") +
          "</div>";
        logCommandOutput(val, matchHtml);
      }
    } else if (parts.length === 2 && (parts[0] === "cat" || parts[0] === "cd" || parts[0] === "rm")) {
      var prefix = parts[1].toLowerCase();
      var filesInDir = VirtualFileSystem.listCurrent();
      var fileMatches = filesInDir
        .filter(function (f) {
          return f.name.toLowerCase().startsWith(prefix);
        })
        .map(function (f) {
          return f.name;
        });

      if (fileMatches.length === 1) {
        commandInput.value = parts[0] + " " + fileMatches[0];
        updateInputMirror(commandInput.value);
      } else if (fileMatches.length > 1) {
        var fMatchHtml =
          '<div style="color:var(--accent-yellow); margin:6px 0;">' +
          fileMatches.join("  ") +
          "</div>";
        logCommandOutput(val, fMatchHtml);
      }
    }
  }

  function setAndRunInput(cmd) {
    if (commandInput) {
      commandInput.value = cmd;
      updateInputMirror(cmd);
      executeCommand(cmd);
    }
  }

  function restartSession() {
    terminalOutput.innerHTML = "";
    printWelcomeBanner();
    focusInput();
  }

  // Initialization
  function init() {
    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    updatePromptPath();
    printWelcomeBanner();
    initWindowManager();
    initDropdownMenus();
    initKeyboardEvents();
    focusInput();

    // Check IE
    if (isUsingIE) {
      alert(cfg.internet_explorer_warning);
    }
  }

  return {
    init: init,
    executeCommand: executeCommand,
    setAndRunInput: setAndRunInput,
    toggleGuiWindow: toggleGuiWindow,
    switchGuiTab: switchGuiTab,
    toggleAboutMac: toggleAboutMac,
    toggleControlCenter: toggleControlCenter,
    copyText: copyText,
    startMatrixRain: startMatrixRain,
    stopMatrixRain: stopMatrixRain,
    restartSession: restartSession,
  };
})();

// Boot on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
