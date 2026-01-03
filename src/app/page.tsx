"use client";
import React from "react";
import { Box, Typography, Button, Card, CardContent, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  TreeIllustration,
  CarbonFootprintIllustration,
  RecycleIllustration,
  ChartGrowthIllustration,
  SolarPanelIllustration,
  HeroEarthIllustration,
} from "@/components/illustrations";
import LandingNavbar from "@/components/Navbar/LandingNavbar";

const Home = () => {
  const router = useRouter();

  const features = [
    {
      title: "Log Daily Activities",
      description: "Record every action that impacts the environment - from your commute to your meals. Create custom activities and build a complete picture of your daily carbon footprint.",
      illustration: <CarbonFootprintIllustration />,
    },
    {
      title: "Real-Time Carbon Tracking",
      description: "See instant calculations of your carbon emissions. Track your environmental impact over time and understand which activities contribute most to your footprint.",
      illustration: <ChartGrowthIllustration />,
    },
    {
      title: "Set Achievable Goals",
      description: "Define personal sustainability targets and milestones. Set weekly or monthly goals to gradually reduce your emissions and track your progress towards a greener lifestyle.",
      illustration: <TreeIllustration />,
    },
    {
      title: "Smart Recommendations",
      description: "Get personalized suggestions based on your activity patterns. Discover eco-friendly alternatives and actionable tips to reduce your carbon footprint effectively.",
      illustration: <RecycleIllustration />,
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Account",
      description: "Sign up in seconds and set up your personalized profile to begin your sustainability journey.",
    },
    {
      step: "2",
      title: "Log Your Activities",
      description: "Record your daily activities - transportation, energy use, food choices, and more. Create custom activities that matter to you.",
    },
    {
      step: "3",
      title: "Track Your Impact",
      description: "View your personalized dashboard with detailed analytics, charts, and insights about your carbon emissions and trends.",
    },
    {
      step: "4",
      title: "Reduce & Improve",
      description: "Follow smart recommendations, set reduction goals, and watch your carbon footprint shrink while making a real difference.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "500K+", label: "Tons CO₂ Saved" },
    { value: "1M+", label: "Activities Logged" },
    { value: "95%", label: "User Satisfaction" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <LandingNavbar />

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #D0E8C5 0%, #F5F5F5 100%)",
          pt: { xs: 12, md: 18 },
          pb: 16,
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: 0.5,
                  bgcolor: "rgba(160, 200, 120, 0.2)",
                  borderRadius: "20px",
                  mb: 3,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                >
                  🌍 Join 10,000+ Eco-Conscious Users
                </Typography>
              </Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: "primary.main",
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "3.75rem" },
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Every Action Counts for{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #27667B 0%, #A0C878 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Our Planet
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  mb: 5,
                  lineHeight: 1.7,
                  fontSize: { xs: "1.1rem", md: "1.35rem" },
                  fontWeight: 400,
                }}
              >
                Take control of your environmental impact. Track your daily activities, measure your carbon footprint, and make meaningful changes that matter.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => router.push("/auth/register")}
                  sx={{
                    px: 5,
                    py: 1.75,
                    bgcolor: "primary.main",
                    color: "#FFFFFF",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    borderRadius: "12px",
                    textTransform: "none",
                    boxShadow: "0 4px 14px rgba(12, 43, 78, 0.25)",
                    "&:hover": {
                      bgcolor: "primary.dark",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(12, 43, 78, 0.35)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Started Free →
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => router.push("/auth/login")}
                  sx={{
                    px: 5,
                    py: 1.75,
                    borderColor: "primary.main",
                    borderWidth: "2px",
                    color: "primary.main",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    borderRadius: "12px",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "primary.dark",
                      borderWidth: "2px",
                      bgcolor: "rgba(12, 43, 78, 0.06)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ maxWidth: 500 }}>
                <HeroEarthIllustration />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box 
        sx={{ 
          py: 8, 
          background: "linear-gradient(135deg, #FFF9E6 0%, #FFF4D6 30%, #FFFAF0 100%)",
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
            {stats.map((stat, index) => (
              <Box key={index} sx={{ flex: { xs: "1 1 calc(50% - 12px)", md: "1 1 calc(25% - 12px)" }, minWidth: "200px" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    bgcolor: "#FFFFFF",
                    border: "1px solid rgba(12, 43, 78, 0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(12, 43, 78, 0.1)",
                      borderColor: "secondary.main",
                    },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      background: "linear-gradient(135deg, #FCB53B 0%, #A0C878 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 800,
                      mb: 1,
                      fontSize: { xs: "2.5rem", md: "3rem" },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Box 
        sx={{ 
          py: 10, 
          background: "linear-gradient(135deg, #FAFDF9 0%, #F5F9F7 100%)",
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 800,
              color: "primary.main",
              mb: 3,
              fontSize: { xs: "2rem", md: "2.75rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Powerful Features for Conscious Living
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 8, maxWidth: 700, mx: "auto", fontSize: "1.125rem", lineHeight: 1.7 }}
          >
            Everything you need to understand, track, and reduce your carbon footprint in one place
          </Typography>

          <Box 
            sx={{ 
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              justifyContent: "center"
            }}
          >
            {features.map((feature, index) => (
              <Box 
                key={index}
                sx={{
                  flex: "1 1 calc(50% - 16px)",
                  minWidth: "300px",
                  maxWidth: "calc(50% - 16px)",
                }}
              >
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent 
                    sx={{ 
                      p: 3, 
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <Box sx={{ mb: 2, display: "flex", justifyContent: "center", height: 120, alignItems: "center" }}>
                      <Box sx={{ transform: index === 3 ? "scale(1.0)" : "scale(0.8)", mt: index === 3 ? 6 : 0 }}>
                        {feature.illustration}
                      </Box>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        mb: 1.5,
                        minHeight: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        lineHeight: 1.7,
                        flexGrow: 1,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 10, background: "linear-gradient(135deg, #F5F5F5 0%, #D0E8C5 100%)" }}>
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 800,
              color: "primary.main",
              mb: 3,
              fontSize: { xs: "2rem", md: "2.75rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Start Your Green Journey
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 8, maxWidth: 700, mx: "auto", fontSize: "1.125rem", lineHeight: 1.7 }}
          >
            Four simple steps to track and reduce your environmental impact
          </Typography>

          <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
            {howItWorks.map((item, index) => (
              <Box key={index} sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)", md: "1 1 calc(25% - 16px)" }, minWidth: "250px", maxWidth: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(25% - 16px)" } }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: 4,
                    position: "relative",
                    bgcolor: "#FFFFFF",
                    border: "2px solid rgba(12, 43, 78, 0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 28px rgba(12, 43, 78, 0.15)",
                      borderColor: "secondary.main",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #FCB53B 0%, #DDEB9D 100%)",
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      mb: 3,
                      mx: "auto",
                      boxShadow: "0 4px 12px rgba(252, 181, 59, 0.3)",
                    }}
                  >
                    {item.step}
                  </Box>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      mb: 1.5,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Dashboard Preview Section */}
      <Box sx={{ py: 10, bgcolor: "#FFFFFF" }}>
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 6, alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "inline-block",
                  px: 2.5,
                  py: 0.75,
                  bgcolor: "rgba(12, 43, 78, 0.08)",
                  borderRadius: "20px",
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Dashboard
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "primary.main",
                  mb: 3,
                  fontSize: { xs: "2rem", md: "2.75rem" },
                  letterSpacing: "-0.02em",
                }}
              >
                Your Personal Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
                Once you log in, access your comprehensive dashboard that shows everything you need to know about your environmental impact.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box sx={{ fontSize: "1.5rem" }}>📊</Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "primary.main", mb: 0.5 }}>
                      Visual Analytics
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      See your carbon emissions through interactive charts and graphs that make complex data easy to understand.
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box sx={{ fontSize: "1.5rem" }}>📅</Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "primary.main", mb: 0.5 }}>
                      Activity Timeline
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      Review all your logged activities with detailed emission calculations for each action you take.
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box sx={{ fontSize: "1.5rem" }}>🎯</Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "primary.main", mb: 0.5 }}>
                      Goal Progress
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      Monitor your goals in real-time and celebrate milestones as you reduce your carbon footprint.
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box sx={{ fontSize: "1.5rem" }}>💡</Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "primary.main", mb: 0.5 }}>
                      Smart Insights
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      Get actionable recommendations based on your unique activity patterns and habits.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ maxWidth: 500, transform: "scale(1.2)" }}>
                <SolarPanelIllustration />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0C2B4E 0%, #27667B 100%)",
          py: 12,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 20% 50%, rgba(160, 200, 120, 0.1) 0%, transparent 50%)",
          },
        }}
      >
        <Box sx={{ maxWidth: "960px", mx: "auto", px: 3, position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              color: "#FFFFFF",
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: "2rem", md: "3rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Start Your Green Journey Today
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "rgba(255, 255, 255, 0.95)",
              mb: 2,
              fontSize: "1.25rem",
              fontWeight: 500,
            }}
          >
            Join our growing community of eco-conscious individuals
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: "rgba(255, 255, 255, 0.85)",
              mb: 5,
              fontSize: "1.125rem",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Every small action leads to big changes. Track, understand, and reduce your carbon footprint starting now.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/auth/register")}
              sx={{
                px: 6,
                py: 2,
                bgcolor: "secondary.main",
                color: "#0C2B4E",
                fontSize: "1.25rem",
                fontWeight: 700,
                borderRadius: "12px",
                textTransform: "none",
                boxShadow: "0 6px 20px rgba(252, 181, 59, 0.4)",
                "&:hover": {
                  bgcolor: "#FCB53B",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 28px rgba(252, 181, 59, 0.5)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Tracking Now →
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "background.paper",
          py: 4,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
          <Typography variant="body2" align="center" color="text.secondary">
            © 2025 GreenTrack. All rights reserved. Making the world greener, one step at a time.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
