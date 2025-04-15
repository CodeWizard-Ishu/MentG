// auth.controller.ts
import crypto from "crypto";
import bcrypt from "bcrypt";
import { getPrismaClient } from "../prisma";
import { sendforgotpasswordmail } from "./mailer";

const prisma = getPrismaClient();


const validatePasswordReset = (email: string) => {
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!email) {
    return "Email is required.";
  }
  if (!emailRegex.test(email)){
    return "Invalid email format.";
  }
  return null;
};

export const forgotPassword = async (req: any, res: any) => {
  try {
    const { email } = req.body;

    const validationError = validatePasswordReset(email);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    // Delete any existing reset tokens for this user
    await prisma.resetToken.deleteMany({
      where: { userId: user.id },
    });

    // Save new reset token
    await prisma.resetToken.create({
      data: {
        token: hashedToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 3600000), // Token expires in 1 hour
      },
    });

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    sendforgotpasswordmail(email, resetUrl);

    res.status(200).json({ success: true, message: `Password reset link sent to: ${email}` });
    console.log(`Password reset link sent to: ${email}`);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ success: false, message: "Error sending password reset email" });
  }
};

export const resetPassword = async (req: any, res: any) => {
  try {
    const { token, newPassword } = req.body;

    // Validate password
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
    }

    // Hash the token from the URL
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find valid reset token
    const resetToken = await prisma.resetToken.findFirst({
      where: {
        token: hashedToken,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!resetToken) {
      return res.status(400).json({success: false, message: "Invalid or expired reset token" });
    }

    // Check if new passsword is matching with old password
    const isMatch = await bcrypt.compare(newPassword, resetToken.user.password);
    if (isMatch) {
      return res.status(400).json({ success: false, message: "New password should de different from the old passowrd!" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password and delete reset token in a transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      prisma.resetToken.delete({
        where: { id: resetToken.id },
      }),
    ]);

    res.status(200).json({ success: true, message: "Password reset successful" });
    console.log(`Password reset completed for user ID: ${resetToken.user.email}`);
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Failed to reset password" });
  }
};

// Cleanup expired tokens (will be running as a cron job)
export const cleanupExpiredTokens = async () => {
  try {
    await prisma.resetToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    console.log("Cleaned up expired reset tokens");
  } catch (error) {
    console.error("Cleanup tokens error:", error);
  }
};
