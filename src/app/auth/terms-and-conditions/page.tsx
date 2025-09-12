"use client";
import React from 'react'
import { Content, Paragraph, TermsAndConditionsContent, Title } from '../auth.styles'


const TermsAndConditions = () => {
  return (
    <TermsAndConditionsContent>
      <Title>Terms and Conditions</Title>
        <Content>
          <Paragraph>
            Welcome to GreenTrack, the Carbon Footprint & Sustainability Tracker
            Application. By accessing or using our services, you agree to comply
            with these Terms and Conditions, all applicable laws, and
            regulations. If you do not agree with any part of these terms, you
            must not use the application.
          </Paragraph>
          <Paragraph>
            As a user of GreenTrack, you are responsible for providing accurate
            and truthful information during registration and when logging your
            activities, such as travel, energy usage, and purchases. You agree
            not to use the application for any illegal, fraudulent, or harmful
            purposes. You must keep your login credentials confidential and
            secure to prevent unauthorized access to your account.
          </Paragraph>
          <Paragraph>
            All user activities are used to calculate estimated carbon
            emissions, which help provide personalized insights and
            recommendations to reduce your carbon footprint. We process and
            store this data securely, and it will not be shared with third
            parties without your explicit consent, except where required by law.
          </Paragraph>
          <Paragraph>
            All intellectual property rights in the GreenTrack platform,
            including software, logos, designs, and data models, remain the
            property of GreenTrack. You are granted a limited, non-exclusive
            license to use the application solely for personal or organizational
            sustainability tracking purposes.
          </Paragraph>
          <Paragraph>
            Please note that the CO₂e estimations provided by GreenTrack are
            based on emission factors and models and should be treated as
            estimates. We do not guarantee absolute accuracy of the results or
            suitability for any regulatory compliance. The application is
            provided &quot;as is&quot; without any warranties, express or
            implied.
          </Paragraph>
          <Paragraph>
            In no event shall GreenTrack be liable for any indirect, incidental,
            special, or consequential damages arising from your use of the
            service. You agree to use the platform at your own risk.
          </Paragraph>
          <Paragraph>
            We may update these Terms and Conditions from time to time, and any
            changes will be published on this Terms page. Updated terms take
            effect immediately upon posting, and your continued use of the
            application constitutes acceptance of the updated terms.
          </Paragraph>
          <Paragraph>
            These terms are governed by the laws of the country in which
            GreenTrack operates, and any disputes will be subject to the
            exclusive jurisdiction of the courts in that region.
          </Paragraph>
        </Content>
    </TermsAndConditionsContent>
  );
}

export default TermsAndConditions