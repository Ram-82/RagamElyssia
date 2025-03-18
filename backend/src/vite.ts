import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Simplified setupVite for production
export async function setupVite(app: Express, server: any) {
  if (process.env.NODE_ENV === "production") {
    // Do nothing in production
    return;
  }
  
  try {
    // Dynamically import vite only in development
    const { createServer, createLogger } = await import('vite');
    
    const viteLogger = createLogger();
    const serverOptions = {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true,
    };

    const vite = await createServer({
      configFile: false,
      customLogger: {
        ...viteLogger,
        error: (msg: string, options: any) => {
          viteLogger.error(msg, options);
          process.exit(1);
        }
      },
      server: serverOptions,
      appType: "custom",
    });

    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;

      try {
        const clientTemplate = path.resolve(
          __dirname,
          "..",
          "..",
          "frontend",
          "index.html",
        );

        // Always reload the index.html file from disk in case it changes
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${nanoid()}"`,
        );
        const page = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } catch (error) {
    console.error("Failed to initialize Vite:", error);
  }
}

export function serveStatic(app: Express) {
  if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "..", "..", "frontend", "dist");

    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));

      // Fall through to index.html if the file doesn't exist
      app.use("*", (_req, res) => {
        res.sendFile(path.resolve(distPath, "index.html"));
      });
    } else {
      console.warn(`Frontend build directory not found: ${distPath}`);
    }
  }
}