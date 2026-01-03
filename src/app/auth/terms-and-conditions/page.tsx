"use client";

import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { GreenTrackLogo } from "@/components/illustrations";
import Link from "next/link";

const TermsAndConditions = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #D0E8C5 0%, #F5F5F5 100%)",
        py: 6,
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: "1050px", width: "100%" }}>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <GreenTrackLogo size={80} />
          </Box>

          <Typography
            variant="h4"
            component="h1"
            align="center"
            fontWeight="bold"
            sx={{ color: "primary.main", mb: 4 }}
          >
            Terms and Conditions
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {/* Content */}
          <Box sx={{ "& > *:not(:last-child)": { mb: 3 } }}>
            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ color: "primary.dark", mb: 1.5 }}
              >
                1. Acceptance of Terms
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ lineHeight: 1.8 }}
              >
                Welcome to GreenTrack, the Carbon Footprint & Sustainability
                Tracker Application. By accessing or using our services, you
                agree to comply with these Terms and Conditions, all applicable
                laws, and regulations. If you do not agree with any part of
                these terms, you must not use the application.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ color: "primary.dark", mb: 1.5 }}
              >
                2. User Responsibilities
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ lineHeight: 1.8 }}
              >
                As a user of GreenTrack, you are responsible for providing
                accurate and truthful information during registration and when
                logging your activities, such as travel, energy usage, and
                purchases. You agree not to use the application for any illegal,
                fraudulent, or harmful purposes. You must keep your login
                credentials confidential and secure to prevent unauthorized
                access to your account.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ color: "primary.dark", mb: 1.5 }}
              >
                3. Data Usage and Privacy
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ lineHeight: 1.8 }}
              >
                All user activities are used to calculate estimated carbon
                emissions, which help provide personalized insights and
                recommendations to reduce your carbon footprint. We process and
                store this data securely, and it will not be shared with third
                parties without your explicit consent, except where required by
                law.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ color: "primary.dark", mb: 1.5 }}
              >
                4. Intellectual Property
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ lineHeight: 1.8 }}
              >
                All intellectual property rights in the GreenTrack platform,
                including software, logos, designs, and data models, remain the
                property of GreenTrack. You are granted a limited, non-exclusive
                license to use the application solely for personal or
                organizational sustainability tracking purposes.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ color: "primary.dark", mb: 1.5 }}
              >
                5. Disclaimers
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ lineHeight: 1.8 }}
              >
                Please note that the CO₂e estimations provided by GreenTrack are
                based on emission factors and models and should be treated as
                estimates. We do not guarantee absolute accuracy of the results
                or suitability for any regulatory compliance. The application is
                provided &quot;as is&quot; without any warranties, express or
                implied.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ color: "primary.dark", mb: 1.5 }}
              >
                6. Limitation of Liability
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ lineHeight: 1.8 }}
              >
                In no event shall GreenTrack be liable for any indirect,
                incidental, special, or consequential damages arising from your
                use of the service. You agree to use the platform at your own
                risk.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ color: "primary.dark", mb: 1.5 }}
              >
                7. Changes to Terms
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ lineHeight: 1.8 }}
              >
                We may update these Terms and Conditions from time to time, and
                any changes will be published on this Terms page. Updated terms
                take effect immediately upon posting, and your continued use of
                the application constitutes acceptance of the updated terms.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ color: "primary.dark", mb: 1.5 }}
              >
                8. Governing Law
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ lineHeight: 1.8 }}
              >
                These terms are governed by the laws of the country in which
                GreenTrack operates, and any disputes will be subject to the
                exclusive jurisdiction of the courts in that region.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Footer */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              If you have any questions about these Terms and Conditions, please
              contact our support team.
            </Typography>
            <Link href="/auth/login" style={{ textDecoration: "none" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "secondary.main",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                ← Back to Login
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TermsAndConditions;