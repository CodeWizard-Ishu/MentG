import { google } from "googleapis";
import { getPrismaClient } from "../../prisma";
import { OAuth2Client } from "google-auth-library";

const prisma = getPrismaClient();

const createOAuth2Client = () => {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.BACKEND_URL}/api/auth/google/callback/`
  );
};

// Token Refresh Utility Function
const refreshGoogleToken = async (mentorId: number) => {
  try {
    // Find existing calendar connection
    const connection = await prisma.calendarConnection.findUnique({
      where: {
        mentorId_provider: {
          mentorId,
          provider: "google",
        },
      },
    });

    if (!connection) {
      throw new Error("No Google connection found");
    }

    // If token is still valid, return existing token
    if (new Date() < connection.expiresAt) {
      return connection.accessToken;
    }

    // Create OAuth2 client for token refresh
    const oauth2Client = createOAuth2Client();

    // Set existing credentials for refresh
    oauth2Client.setCredentials({
      access_token: connection.accessToken,
      refresh_token: connection.refreshToken || undefined,
    });

    // Attempt to refresh the token
    const { credentials } = await oauth2Client.refreshAccessToken();

    // Update database with new token details
    const updatedConnection = await prisma.calendarConnection.update({
      where: {
        mentorId_provider: {
          mentorId,
          provider: "google",
        },
      },
      data: {
        accessToken: credentials.access_token || "",
        expiresAt: new Date(credentials.expiry_date || Date.now() + 3600000), // 1 hour from now
        // Update refresh token if a new one is provided
        ...(credentials.refresh_token && {
          refreshToken: credentials.refresh_token,
        }),
      },
    });

    return updatedConnection.accessToken;
  } catch (error) {
    console.error("Token Refresh Error:", error);
    throw new Error("Failed to refresh Google OAuth token");
  }
};

// Utility function to get authenticated Google API client
const getAuthenticatedGoogleClient = async (mentorId: number) => {
  try {
    // Refresh token or get existing valid token
    const accessToken = await refreshGoogleToken(mentorId);

    // Create and return authenticated client
    const oauth2Client = createOAuth2Client();
    oauth2Client.setCredentials({ access_token: accessToken });

    return oauth2Client;
  } catch (error) {
    console.error("Failed to get authenticated client:", error);
    throw error;
  }
};

export const initiateGoogleConnection = async (req: any, res: any) => {
  const { userId, redirectUrl } = req.query;

  const scopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const state = JSON.stringify({ 
    userId,
    redirectUrl: redirectUrl || `${process.env.FRONTEND_URL}/dashboard`
  });

  const oauth2Client = createOAuth2Client();

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: state,
    prompt: 'consent'
  });

  res.redirect(url);
};

export const handleGoogleCallback = async (req: any, res: any) => {
  const { code, state } = req.query;
  const oauth2Client = createOAuth2Client();
  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // Get user profile info
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    const { userId, redirectUrl } = JSON.parse(state as string);
    const parsedUserId = parseInt(userId as string);

    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedUserId },
    });

    if (!mProfile) {
      return res.redirect(`${redirectUrl}?connected=error`);
    }

    // Store or update calendar connection
    await prisma.calendarConnection.upsert({
      where: {
        mentorId_provider: {
          mentorId: mProfile.userId,
          provider: "google",
        },
      },
      update: {
        accessToken: tokens.access_token || "",
        refreshToken: tokens.refresh_token || "",
        expiresAt: new Date(tokens.expiry_date || Date.now()),
        email: userInfo.data.email || "",
      },
      create: {
        mentorId: mProfile.userId,
        provider: "google",
        accessToken: tokens.access_token || "",
        refreshToken: tokens.refresh_token || "",
        expiresAt: new Date(tokens.expiry_date || Date.now()),
        email: userInfo.data.email || "",
      },
    });

    // Redirect back with success
    res.redirect(`${redirectUrl}?connected=success`);
  } catch (error) {
    console.error("Google Connection Error:", error);
    const { redirectUrl } = JSON.parse(state as string);
    res.redirect(`${redirectUrl}?connected=error`);
  }
};

export const getCalendarConnections = async (req: any, res: any) => {
  const { userId } = req.params;
  const parsedMentorId = parseInt(userId);

  try {
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
      include: {
        calendarConnections: {
          where: { provider: "google" },
        },
      },
    });

    if (!mProfile) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const googleConnection = mProfile.calendarConnections[0];

    // Check token validity before responding
    let isTokenValid = false;
    if (googleConnection) {
      try {
        // Attempt to refresh token to validate connection
        await refreshGoogleToken(mProfile.userId);
        isTokenValid = true;
      } catch {
        isTokenValid = false;
      }
    }

    res.json({
      googleConnection: googleConnection
        ? {
            email: googleConnection.email,
          }
        : null,
    });
  } catch (error) {
    console.error("Fetch Connections Error:", error);
    res.status(500).json({ error: "Failed to fetch connections" });
  }
};

export const disconnectCalendar = async (req: any, res: any) => {
  const { userId } = req.params;
  const { provider } = req.body;
  const parsedUserId = parseInt(userId);

  try {
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedUserId },
      include: { calendarConnections: true },
    });

    if (!mProfile) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const googleConnection = mProfile.calendarConnections.find(
      (conn) => conn.provider === "google"
    );

    if (googleConnection) {
      const oauth2Client = createOAuth2Client();

      // Revoke Google access token
      try {
        await oauth2Client.revokeToken(googleConnection.accessToken);
      } catch (revokeError) {
        console.warn("Token revocation warning:", revokeError);
      }
    }

    await prisma.calendarConnection.deleteMany({
      where: {
        mentorId: mProfile.userId,
        provider: provider,
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Disconnect Calendar Error:", error);
    res.status(500).json({ error: "Failed to disconnect calendar" });
  }
};

export { refreshGoogleToken, getAuthenticatedGoogleClient };
