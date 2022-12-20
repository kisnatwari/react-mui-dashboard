import Menus from "../../json-api/Menus";
import {
  Stack,
  Container,
  Button
} from "@mui/material";
import "./Navbar.css";
import {
  Link
} from "react-router-dom";
const Navbar = ()=>{
  const Buttons = ({data})=>{
    const buttonsDesign = (
      <>
        <Link to={data.link} sx={{
          borderRadius: "0",
          px: 3,
          "&:hover": {
            transition: "0.5s",
            backgroundColor: "secondary.main",
            color: "white"
          }
        }}>{data.label}</Link>
      </>
    );
    return buttonsDesign;
  }
  const design = (
    <>
      <Stack className="bg-light">
        <Container className="bg-light">
          <Stack direction={{
            xs: "column",
            sm: "row"
          }} justifyContent="space-between">
            <h4>Testing</h4>
            <Stack direction={{
              xs: "column",
              sm: "row"
            }} spacing={2}>
              {
                Menus.map((menu)=>{
                  return <Buttons key={menu.id} data={menu}/>
                })
              }
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </>
  );
  return design;
}
export default Navbar;
