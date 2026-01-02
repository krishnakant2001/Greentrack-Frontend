import * as React from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface DecisionModalProps {
  open: boolean;
  handleClose: (action: "confirm" | "cancel") => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 20px;
    padding: 8px;
    max-width: 450px;
    box-shadow: 0 8px 32px rgba(20, 61, 96, 0.15);
  }
`;

const ModalContent = styled.div`
  padding: 32px 24px 24px;
  text-align: center;
`;

const IconWrapper = styled.div<{ $variant: string }>`
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => {
    switch (props.$variant) {
      case "danger":
        return "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)";
      case "warning":
        return "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)";
      default:
        return "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)";
    }
  }};
  box-shadow: ${(props) => {
    switch (props.$variant) {
      case "danger":
        return "0 4px 20px rgba(211, 47, 47, 0.2)";
      case "warning":
        return "0 4px 20px rgba(230, 81, 0, 0.2)";
      default:
        return "0 4px 20px rgba(21, 101, 192, 0.2)";
    }
  }};

  svg {
    font-size: 48px;
    color: ${(props) => {
      switch (props.$variant) {
        case "danger":
          return "#d32f2f";
        case "warning":
          return "#e65100";
        default:
          return "#1565c0";
      }
    }};
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #143d60;
  margin: 0 0 12px 0;
  line-height: 1.3;
`;

const ModalDescription = styled.p`
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 32px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 24px 24px;
`;

const Button = styled.button<{ $variant: "primary" | "secondary" }>`
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(211, 47, 47, 0.4);
      background: linear-gradient(135deg, #b71c1c 0%, #c62828 100%);
    }
  `
      : `
    background: white;
    color: #143d60;
    border: 2px solid #e0e0e0;

    &:hover {
      background: #f5f5f5;
      border-color: #143d60;
    }
  `}

  &:active {
    transform: translateY(0);
  }
`;

const getIcon = (variant: string) => {
  switch (variant) {
    case "danger":
      return <WarningAmberRoundedIcon />;
    case "warning":
      return <InfoOutlinedIcon />;
    default:
      return <CheckCircleOutlineIcon />;
  }
};

export const DecisionModal: React.FC<DecisionModalProps> = ({
  open,
  handleClose,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={() => handleClose("cancel")}
      maxWidth="sm"
    >
      <ModalContent>
        <IconWrapper $variant={variant}>{getIcon(variant)}</IconWrapper>
        <ModalTitle>{title}</ModalTitle>
        {description && <ModalDescription>{description}</ModalDescription>}
      </ModalContent>
      <ButtonGroup>
        <Button $variant="secondary" onClick={() => handleClose("cancel")}>
          {cancelText}
        </Button>
        <Button $variant="primary" onClick={() => handleClose("confirm")}>
          {confirmText}
        </Button>
      </ButtonGroup>
    </StyledDialog>
  );
};
