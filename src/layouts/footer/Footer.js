import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography>
        © 2023 All rights reserved by{" "}
        <Link href="#">
          <a>squiggiy.netify.app</a>
        </Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
