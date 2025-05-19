import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Try multiple ports in sequence since we're having issues with specific ports
  const ports = [3333, 4444, 7777, 8888, 9999];
  
  function tryNextPort(index = 0) {
    if (index >= ports.length) {
      log(`Failed to find an available port. Please try restarting the repl.`);
      process.exit(1);
      return;
    }
    
    const currentPort = ports[index];
    
    const errorHandler = (err: any) => {
      if (err.code === 'EADDRINUSE') {
        log(`Port ${currentPort} is in use, trying next port...`);
        server.removeListener('error', errorHandler);
        tryNextPort(index + 1);
      } else {
        log(`Server error: ${err.message}`);
        process.exit(1);
      }
    };
    
    server.once('error', errorHandler);
    
    server.listen({
      port: currentPort,
      host: "0.0.0.0",
    }, () => {
      log(`Server running successfully on port ${currentPort}`);
    });
  }
  
  tryNextPort();
})();