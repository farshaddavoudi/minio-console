import React from "react";
import mlogo from "../../../../assets/images/ata-menu-logo-transparent.png";

export interface CustomSidebarLogoProps {
  onClick?: React.MouseEventHandler<any>;
  inverse?: boolean; // for dark/light backgrounds
}

const CustomSidebarLogo: React.FC<CustomSidebarLogoProps> = ({
  onClick,
  inverse,
}) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 0 16px 0",
      cursor: onClick ? "pointer" : "default",
      userSelect: "none",
    }}
  >
    {
      <img src={mlogo} style={{maxHeight: "150px"}} />
    
    /* <span
      style={{
        fontWeight: 700,
        fontSize: 24,
        color: inverse ? "#fff" : "#081C42",
        letterSpacing: 2,
        textTransform: "uppercase",
      }}
    >
      ATA S3
    </span>
    <span
      style={{
        fontWeight: 400,
        fontSize: 14,
        color: inverse ? "#fff" : "#6B7A90",
        letterSpacing: 1,
        marginTop: 4,
      }}
    >
      Object Storage
    </span> */}
  </div>
);

export default CustomSidebarLogo;
