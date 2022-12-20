import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  AppBar,
  IconButton,
  Toolbar,
  Button,
  ListSubheader,
  Collapse,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Breadcrumbs,
  Typography
} from "@mui/material";

import { deepOrange } from '@mui/material/colors';


import {
  Outlet,
  Link,
  useResolvedPath,
  useMatch,
  useLocation
} from "react-router-dom";

import {
  useState
} from "react";

import AdminMenu from "../../json-api/AdminMenu";
import MediaQuery from "react-responsive";

const Admin = ()=>{
  const [active,setActive] = useState(true);
  const [activeOnMobile,setActiveOnMobile] = useState(false);

  const [width,setWidth] = useState(250);
  const [collapsible,setCollapsible] = useState(false);
  const location = useLocation();
  let routing = location.pathname.split("/");

  // start - profile menu code
  const [parent,setParent] = useState(null);
  const open = Boolean(parent);
  const openProfileMenu = (e)=>{
    const el = e.currentTarget;
    return setParent(el);
  }
  const closeProfileMenu = ()=>{
    return setParent(null);
  }
  // end - profile menu code

  const Nav = ({data})=>{
    const resolved = useResolvedPath(data.link ? data.link : false);
    const activeLink = useMatch({path: resolved.pathname, end: true});

    const navDesign = (
      <>
        <ListItem sx={{py: 0}}>
          <ListItemButton
            onClick={data.isDropdown ? ()=>setCollapsible(!collapsible) : null}
            component={Link}
            to={data.link ? data.link : false}
            style={{
              backgroundColor: activeLink && data.link ? deepOrange[500] : null,
              color: activeLink && data.link ? "white" : null
            }}
          >
            <ListItemIcon>
              <span className="material-icons-outlined" style={{
                color: activeLink && data.link ? "white" : null
              }}>{data.icon}</span>
            </ListItemIcon>
            <ListItemText primary={data.label} />
            <span className="material-icons-outlined">
              {
                data.isDropdown ? "expand_more" : null
              }
            </span>
          </ListItemButton>
        </ListItem>
        {
          data.isDropdown ? <Dropdown menu={data.dropdownMenu} /> : null
        }
      </>
    );
    return navDesign;
  }

  const MenuList = ({admin})=>{
    const menuDesign = (
      <>
        <List subheader={<ListSubheader>{admin.cat}</ListSubheader>}>
          {
            admin.menus.map((menu)=>{
              return <Nav key={menu.id} data={menu} />
            })
          }
        </List>
      </>
    );
    return menuDesign;
  }

  const Dropdown = ({menu})=>{
    const dropdownDesign = (
      <>
        <Collapse in={collapsible} sx={{ pl: 4 }}>
          {
            menu.map((data)=>{
              return <Nav key={data.id} data={data} />
            })
          }
        </Collapse>
      </>
    );
    return dropdownDesign;
  }

  const controlDrawerOnDesktop = ()=>{
    return(
      setActive(!active),
      active ? setWidth(0) : setWidth(250)
    );
  }

  const controlDrawerOnMobile = ()=>{
    return(
      setActiveOnMobile(!activeOnMobile),
      activeOnMobile ? setWidth(0) : setWidth(250)
    );
  }

  const DesktopDrawer = ()=>{
    const tmp = (
      <>
        <Drawer open={active} variant="persistent" sx={{
          width: width,
          "& .MuiDrawer-paper": {
            width: width,
            bgcolor: "white"
          }
        }}>
          <List sx={{ mt: 4 }} subheader={<ListSubheader>
              <img src="images/logo.webp" width="200" alt="brand-logo" />
            </ListSubheader>} />
          {
            AdminMenu.map((admin)=>{
              return <MenuList key={admin.id} admin={admin}/>
            })
          }

        </Drawer>
      </>
    );
    return tmp;
  }

  const MobileDrawer = ()=>{
    const tmp = (
      <>
        <Drawer open={activeOnMobile} variant="temporary" onClick={controlDrawerOnMobile} onClose={controlDrawerOnMobile} sx={{
          width: width,
          "& .MuiDrawer-paper": {
            width: width,
            bgcolor: "white"
          }
        }}>
          <List sx={{ mt: 4 }} subheader={<ListSubheader>
              <img src="images/logo.webp" width="200" alt="brand-logo" />
            </ListSubheader>} />
          {
            AdminMenu.map((admin)=>{
              return <MenuList key={admin.id} admin={admin}/>
            })
          }

        </Drawer>
      </>
    );
    return tmp;
  }

  const BreadLink = ({data})=>{
    return <Typography style={{
      textTransform: "capitalize",
      color: data.index === data.length ? deepOrange[500] : null
    }}>{data.item}</Typography>
  }

  const design = (
    <>
      <Stack>
        <MediaQuery minWidth={1224}>
          <DesktopDrawer />
        </MediaQuery>
        <MediaQuery maxWidth={1224}>
          <MobileDrawer />
        </MediaQuery>
        <AppBar color="inherit" elevation={0} position="fixed" sx={{
          width: {
            xs: "100%",
            md: `calc(100% - ${width}px)`
          },
          transition: "0.1s",
          pr: 4
        }}>
          <Stack direction="row" justifyContent="space-between">
            <Toolbar>
              <MediaQuery minWidth={1224}>
                <IconButton color="inherit" onClick={controlDrawerOnDesktop}>
                  <span className="material-icons-outlined">menu</span>
                </IconButton>
              </MediaQuery>

              <MediaQuery maxWidth={1224}>
                <IconButton color="inherit" onClick={controlDrawerOnMobile}>
                  <span className="material-icons-outlined">menu</span>
                </IconButton>
              </MediaQuery>

            </Toolbar>

            <Toolbar>
              <Stack direction="row" alignItems="center" spacing="5px">
                <IconButton color="inherit">
                  <span className="material-icons-outlined">shopping_basket</span>
                </IconButton>
                <IconButton color="inherit">
                  <span className="material-icons-outlined">mail</span>
                </IconButton>
                <IconButton color="inherit">
                  <span className="material-icons-outlined">notifications</span>
                </IconButton>
                <IconButton color="inherit" onClick={openProfileMenu}>
                  <Avatar src="https://mui.com/static/images/avatar/2.jpg" />
                </IconButton>
                <Menu
                  anchorEl={parent}
                  open={open}
                  onClose={closeProfileMenu}
                  onClick={closeProfileMenu}
                  PaperProps={{
                     elevation: 0,
                     sx: {
                       overflow: 'visible',
                       filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                       mt: 1.5,
                       '& .MuiAvatar-root': {
                         width: 32,
                         height: 32,
                         ml: -0.5,
                         mr: 1,
                       },
                       '&:before': {
                         content: '""',
                         display: 'block',
                         position: 'absolute',
                         top: 0,
                         right: 14,
                         width: 10,
                         height: 10,
                         bgcolor: 'background.paper',
                         transform: 'translateY(-50%) rotate(45deg)',
                         zIndex: 0,
                       },
                     },
                   }}
                   transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                   anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem>
                    <Avatar /> Add account
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <span className="material-icons-outlined" style={{ marginRight: "8px" }}>
                        person_add
                      </span>
                      Add another account
                    </ListItemIcon>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <span className="material-icons-outlined" style={{ marginRight: "8px" }}>
                        settings
                      </span>
                      Setting
                    </ListItemIcon>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <span className="material-icons-outlined" style={{ marginRight: "8px" }}>
                        logout
                      </span>
                      Logout
                    </ListItemIcon>
                  </MenuItem>
                </Menu>
              </Stack>
            </Toolbar>
          </Stack>
        </AppBar>

        <Stack sx={{
          ml: {
            xs: 0,
            md: `${width}px`
          },
          mt: 4,
          p: 3,
          transition: "0.1s",
          bgcolor: "#f5f5f5",
          height: "100vh"
        }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ my: 4 }}>
            {
              routing.map((item,index)=>{
                if(index > 0)
                {
                  return <BreadLink key={index} data={{
                    item: item,
                    index: index,
                    length: routing.length-1
                  }} />
                }
              })
            }
          </Breadcrumbs>
          <Outlet />
        </Stack>
      </Stack>
    </>
  );
  return design;
}
export default Admin;
