"use client";
import React from "react";
import WorkInProgress from "@/components/reusableComponents/WorkInProgress";

const Recommendations = () => {
  return (
    <WorkInProgress
      title="Smart Recommendations"
      message="We're developing an intelligent recommendation engine that will analyze your carbon footprint and provide personalized suggestions to help you reduce your environmental impact."
      icon="rocket"
    />
  );
};

export default Recommendations;
