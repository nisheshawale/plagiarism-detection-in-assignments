import {
  AppBar,
  AppBarProps,
  Box,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import clsx from "clsx";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import ProjectLogo from "../logo/logo";
import { NavButton } from "../navbar-button/navButton";
import { useStyles } from "./styles";

export const Header = ({
  className,
  ...rest
}: {
  className?: string;
  rest?: AppBarProps;
}) => {
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const classes = useStyles();
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="mobile-appbar-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      classes={{
        paper: classes.mobileMenu,
      }}
    >
      <MenuItem>
        <NavButton
          type="menuItem"
          title={"Products"}
          redirectTo={"/products"}
        />
      </MenuItem>
      <MenuItem>
        <NavButton type="menuItem" title={"About"} redirectTo={"/about"} />
      </MenuItem>
      <MenuItem>
        <NavButton type="menuItem" title={"Team"} redirectTo={"/team"} />
      </MenuItem>

      <MenuItem>
        <NavButton type="menuItem" title={"Admin"} redirectTo={"/admin"} />
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      color="inherit"
      className={clsx(className, classes.root)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <div className={classes.logoContainer}>
          <RouterLink to="/">
            <ProjectLogo />
          </RouterLink>

          <RouterLink to="/" style={{ textDecoration: "none" }}>
            <Typography
              className={classes.projectName}
              variant="h5"
              style={{
                color: "white",
              }}
            >
              kopy
            </Typography>
          </RouterLink>
        </div>
        <Box flexGrow={1} />
        <Hidden smDown>
          <NavButton type="button" title="Products" redirectTo="/products" />
          <NavButton type="button" title="About" redirectTo="/about" />
          <NavButton type="button" title="Team" redirectTo="/team" />
          <NavButton type="button" title="Admin" redirectTo="/admin" />
        </Hidden>
        <Hidden mdUp>
          <IconButton
            aria-label="show more"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreVert />
          </IconButton>
        </Hidden>
        {renderMobileMenu}
      </Toolbar>
    </AppBar>
  );
};
