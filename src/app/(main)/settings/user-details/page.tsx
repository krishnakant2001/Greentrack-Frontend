import React from "react";
import {
  ButtonSection,
  Container,
  DeleteButton,
  Heading,
  LeftSection,
  RightSection,
  Section,
  Subtitle,
  Title,
  Wrapper,
} from "../../main.styles";
import { Button, TextField } from "@mui/material";
import PasswordField from "@/components/reusableComponents/PasswordField";
import InputSelectField from "@/components/reusableComponents/InputSelectField";
import { regionData } from "@/data/regionData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserDetails = () => {
  const email = "krishnakant@gmail.com";
  return (
    <Container>
      <Heading>
        <Title>User Details</Title>
        <Subtitle>
          Manage your personal information and account settings.
        </Subtitle>
      </Heading>
      <Wrapper>
        <ButtonSection>
          <Button>
            <EditIcon fontSize="small" />
            Edit
          </Button>
          <Button variant="outlined">
            Cancel
          </Button>
          <Button >Save</Button>
        </ButtonSection>
        <Section>
          <LeftSection>Email</LeftSection>
          <RightSection>
            <TextField
              fullWidth
              required
              id="email"
              label="Email"
              type="Email"
              variant="outlined"
              value={email}
            />
          </RightSection>
        </Section>
        <Section>
          <LeftSection>Name</LeftSection>
          <RightSection>
            <TextField
              required
              fullWidth
              id="first-name"
              label="First Name"
              variant="outlined"
              value={"Krishnakant"}
              // onChange={handleFirstNameChange}
              // error={!!firstNameError}
              // helperText={firstNameError}
            />
            <TextField
              fullWidth
              id="last-name"
              label="Last Name"
              variant="outlined"
              value={"Nagvanshi"}
              // onChange={handleLastNameChange}
            />
          </RightSection>
        </Section>
        <Section>
          <LeftSection>Change Region</LeftSection>
          <RightSection>
            <InputSelectField
              required
              id="region"
              label="Region"
              fullWidth
              value={"India"}
              // onChange={handleRegionChange}
              // error={regionError}
              options={regionData}
            />
          </RightSection>
        </Section>
        <Section>
          <LeftSection>Password</LeftSection>
          <RightSection>
            <PasswordField
              id="old-password"
              label="Old Password"
              // value={fields.pswd}
              // onChange={handlePswdChange}
              // error={pswdError}
            />
            <PasswordField
              id="new-password"
              label="New Password"
              // value={fields.pswd}
              // onChange={handlePswdChange}
              // error={pswdError}
            />
            <PasswordField
              id="confirm-password"
              label="Confirm Password"
              // value={fields.confirmPswd}
              // onChange={handleConfirmPswdChange}
              // error={confirmPswdError}
            />
          </RightSection>
        </Section>
        <Section>
          <LeftSection>Delete Account</LeftSection>
          <RightSection>
            <DeleteButton>
              <DeleteIcon/>
              Delete
            </DeleteButton>
          </RightSection>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default UserDetails;
