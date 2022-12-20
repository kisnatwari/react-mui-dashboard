import {
    Grid,
    Stack,
    Button,
    Container,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel
} from "@mui/material";

import {
  Link,
  useNavigate
} from "react-router-dom";

const Login = ()=>{
  const navigate = useNavigate();

  const login = (e)=>{
    e.preventDefault();
    navigate("/admin-panel");
  }
  const design = (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <h1>One</h1>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h1>Login</h1>
            <form onSubmit={login}>
              <Stack direction="column" spacing={3}>
                <TextField label="Username" variant="outlined"/>
                <TextField label="Password" variant="outlined" type="password" />
                <Stack direction="row" justifyContent="end">
                  <a href="#">Forgot password ?</a>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Remember me" />
                  </FormGroup>
                  <Button type="submit" variant="contained" color="secondary" sx={{px: 3,py: 1}}>Login</Button>
                </Stack>
                <Link to="/">Create and account</Link>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
  return design;
}
export default Login;
