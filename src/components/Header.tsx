import {AppBar,Toolbar, Typography } from "@mui/material";

const styles = {
    root: {
        flexGrow: 1
      },
      menuButton: {
        marginRight:'16px'
      },
      title: {
        flexGrow: 1,
        textAlign: "center"
      },
      logo: {
        maxWidth: 40,
        marginRight: '10px'
      }
  };

export default function Header() {

  return (
    <div style={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            HealtHero
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
