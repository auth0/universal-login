import path from "path";
import fs from "fs";
import { execa } from "execa";
import concurrently from "concurrently";
import { logger } from "./utils/index.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screenTesterDir = path.resolve(__dirname, "../screen-tester");
const screenTesterNodeModules = path.join(screenTesterDir, "node_modules");

/**
 * Checks if screen-tester dependencies are installed and installs them if not.
 * @returns {Promise<void>}
 */
async function ensureScreenTesterDeps() {
  if (!fs.existsSync(screenTesterNodeModules)) {
    logger.info(
      "[Screen Tester] Dependencies not found. Running npm install..."
    );
    try {
      await execa("npm", ["install"], {
        cwd: screenTesterDir,
        stdio: "inherit",
      });
      logger.success("[Screen Tester] Dependencies installed successfully.");
    } catch (error) {
      logger.error("[Screen Tester] Failed to install dependencies:", error);
      // Re-throw the error to be caught by the calling function
      throw error;
    }
  }
}

/**
 * Ensures the run-watcher.js helper script exists.
 * @returns {string} Path to the watcher runner script.
 */
function ensureWatcherRunnerScript() {
  const watcherRunnerScript = path.join(__dirname, "run-watcher.js");
  if (!fs.existsSync(watcherRunnerScript)) {
    const watcherRunnerCode = `
import { watchAndUpload } from './utils/watcher.js';
import { logger } from './utils/logger.js';
const screen = process.argv[2];
if (!screen) { logger.error('Watcher script needs screen name argument.'); process.exit(1); }
watchAndUpload(screen).catch(err => { logger.error('Error in watcher:', err); process.exit(1); });
        `;
    fs.writeFileSync(watcherRunnerScript, watcherRunnerCode.trim());
    logger.info(`Created watcher runner script: ${watcherRunnerScript}`);
  }
  return watcherRunnerScript;
}

/**
 * Starts the development environment for Standard Mode.
 * (Checks deps and starts screen-tester)
 * @param {string} screenName - The screen name being tested.
 */
export async function startStandardEnv(screenName) {
  logger.section("Starting Screen Tester");
  await ensureScreenTesterDeps();

  // Set up environment variables
  const env = {
    ...process.env,
    SCREEN_NAME: screenName,
    RUN_MODE: "standard",
  };

  try {
    // Run Vite in the background
    const viteProcess = execa("npm", ["run", "start"], {
      cwd: screenTesterDir,
      env,
      // Use pipe instead of inherit to control output formatting
      stdio: ["inherit", "pipe", "pipe"],
    });

    // Log Vite output with custom formatting that won't overwrite previous logs
    if (viteProcess.stdout) {
      viteProcess.stdout.on("data", (data) => {
        const output = data.toString().trim();
        if (output.includes("Local:") && output.includes("http://localhost")) {
          logger.success(
            "[Screen Tester] Server running at http://localhost:4040"
          );
          logger.info("Press Ctrl+C to stop the screen tester.");
        } else if (output) {
          logger.info(`[Vite] ${output}`);
        }
      });
    }

    if (viteProcess.stderr) {
      viteProcess.stderr.on("data", (data) => {
        logger.error(`[Vite Error] ${data.toString().trim()}`);
      });
    }

    // Wait for process to complete
    await viteProcess;
  } catch (error) {
    if (error.exitCode !== null && !error.isCanceled) {
      logger.error("[Screen Tester] Failed to start:", error);
    }
    // Re-throw or handle as needed by the calling script
    throw error;
  }
}

/**
 * Starts the development environment for Advanced Mode.
 * (Checks deps, ensures watcher script, starts tester, assets server, and watcher concurrently)
 * @param {string} screenName - The screen name being tested.
 */
export async function startAdvancedEnv(screenName) {
  logger.section("Starting Servers (Screen Tester, Assets, HMR Watcher)");
  await ensureScreenTesterDeps();
  const watcherRunnerScript = ensureWatcherRunnerScript();

  // Use the helper script to run screen-tester with filtered output
  const testerCommand = `node ${path.join(__dirname, "run-tester.js")} ${screenName}`;

  const commands = [
    {
      name: "screen-tester",
      command: testerCommand,
      cwd: path.resolve(__dirname, ".."),
      prefixColor: "blue",
    },
    { name: "assets-server", command: "npm run serve", prefixColor: "green" }, // Serves ./dist on 3032
    {
      name: "acul-hmr",
      command: `node ${watcherRunnerScript} ${screenName}`,
      prefixColor: "magenta",
    }, // Runs watchAndUpload
  ];

  logger.info("Starting processes concurrently...");
  try {
    // Call concurrently directly as a library function
    const { result } = concurrently(commands, {
      killOthers: ["failure", "success"],
      cwd: path.resolve(__dirname, ".."), // Run concurrently from project root
    });

    await result;

    logger.success("Advanced mode processes finished.");
  } catch (error) {
    // The logic in advanced-mode.js checks for graceful termination signals.
    throw error;
  }
}
