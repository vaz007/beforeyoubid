import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 475,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function SavedForm(props) {
  const {
    firstName,
    lastName,
    email,
    strret,
    city,
    state,
    postCode,
    phoneNumber,
  } = props.data.savedContact;
  const classes = useStyles();
  return (
    <div style={{ flex: 1, margin: '5rem' }}>
      <div style={{ flex: 1,}}>
        <Grid container>
          <Grid item xs>
            <h3>Saved Data</h3>
          </Grid>
        </Grid>
      </div>
      <div style={{ flex: 1 }}>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography variant="h4" component="h2">
              {email}
            </Typography>
            <Typography variant="h2" component="h2">
              {phoneNumber}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.user,
  };
};

export default connect(mapStateToProps)(SavedForm);
