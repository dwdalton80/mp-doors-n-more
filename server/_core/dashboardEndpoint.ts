import { Express, Request, Response } from "express";

export function registerDashboardEndpoint(app: Express) {
  // Password verification endpoint for dashboard access
  app.post("/api/dashboard/verify-password", (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const dashboardPassword = process.env.DASHBOARD_PASSWORD || "Maldonado";

      if (password === dashboardPassword) {
        // Set a session cookie or return success
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, error: "Incorrect password" });
      }
    } catch (error) {
      console.error("[Dashboard Endpoint] Error verifying password:", error);
      res.status(500).json({ success: false, error: "Failed to verify password" });
    }
  });
}
