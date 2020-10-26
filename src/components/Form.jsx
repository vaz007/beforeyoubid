/* eslint-disable react/prop-types */
import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  Select,
  FormHelperText,
  InputLabel,
  Paper,
  Button,
  Grid,
} from "@material-ui/core";
import { connect } from "react-redux";
import { contactInformation } from "../redux-helpers/actions/index";

const Form = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    contactInformation,
    history,
  } = props;

  const onSubmit = async (formValues) => {
    contactInformation(formValues);
    history.push("/contactInformation");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        elevation={3}
        style={{ width: "100%", height: "4rem", backgroundColor: "lightblue" }}
      >
        <Grid container>
          <Grid item style={{ margin: "1rem" }}>
            <h3 style={{ color: "white" }}> Create Contact</h3>
          </Grid>
          <Grid item style={{ margin: "1rem", flex: 1 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={pristine || submitting}
              style={{ marginRight: "1rem" }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={pristine || submitting}
            >
              Clear Values
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <div>
        <div style={{ flexGrow: 1, marginTop: "5rem", width: "35%" }}>
          <Grid container>
            <Grid item xs>
              <Field name="title" component="select">
                <option value="Mr">Mr</option>
                <option value="Miss">Miss</option>
              </Field>
            </Grid>
            <Grid item xs>
              <Field
                name="firstName"
                component={renderTextField}
                type="text"
                placeholder="First Name"
              />
            </Grid>
            <Grid item xs>
              <Field
                name="lastName"
                component={renderTextField}
                type="text"
                placeholder="Last Name"
              />
            </Grid>
          </Grid>
        </div>

        <div
          style={{
            flexGrow: 1,
            marginTop: "2rem",
            marginLeft: "5rem",
            width: "25%",
          }}
        >
          <Grid container>
            <Grid item xs>
              <Field
                name="accountName"
                component={renderTextField}
                type="text"
                placeholder="Account Name"
              />
            </Grid>
            <Grid item xs>
              <Field
                name="companyName"
                component={renderTextField}
                type="text"
                placeholder="Company Name (Optional)"
              />
            </Grid>
          </Grid>
        </div>

        <div
          style={{
            flexGrow: 1,
            marginTop: "2rem",
            marginLeft: "5rem",
            width: "25%",
          }}
        >
          <Grid container>
            <Grid item xs>
              <Field
                name="phoneNumber"
                component={renderTextField}
                type="number"
                placeholder="mobile number"
              />
            </Grid>
            <Grid item xs>
              <Field
                name="fax"
                component={renderTextField}
                type="number"
                placeholder="fax number"
              />
            </Grid>
          </Grid>
        </div>

        <div
          style={{
            flexGrow: 1,
            marginTop: "2rem",
            marginLeft: "5rem",
            width: "25%",
          }}
        >
          <Grid container>
            <Grid item xs>
              <Field
                name="ownership"
                component={renderTextField}
                type="text"
                placeholder="Title (Optional) / Owner"
              />
            </Grid>
            <Grid item xs>
              <Field
                name="email"
                component={renderTextField}
                type="email"
                placeholder="Email"
              />
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            marginTop: "2rem",
            marginLeft: "5rem",
            width: "8%",
          }}
        >
          <Grid container>
            <Grid item xs>
              <label htmlFor="emailOptOut">Email Opt Out</label>
              <div>
                <Field
                  name="emailOptOut"
                  id="emailOptOut"
                  component={renderCheckbox}
                  type="checkbox"
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            flexGrow: 1,
            marginTop: "2rem",
            marginLeft: "5rem",
            width: "25%",
          }}
        >
          <Grid container>
            <Grid item xs>
              <h4>Address Information</h4>
            </Grid>
          </Grid>
        </div>

        <div
          style={{
            flexGrow: 1,
            marginTop: "2rem",
            marginLeft: "5rem",
            width: "25%",
          }}
        >
          <Grid container>
            <Grid item xs>
              <Field
                name="strret"
                component={renderTextField}
                type="text"
                placeholder="1. Elizabeth Street"
              />
            </Grid>
            <Grid item xs>
              <Field
                name="city"
                component={renderTextField}
                type="text"
                placeholder="Sydney"
              />
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            flexGrow: 1,
            marginTop: "2rem",
            marginLeft: "5rem",
            width: "25%",
          }}
        >
          <Grid container>
            <Grid item xs>
              <Field name="state" component={renderSelectField}>
                <option />
                <option value="NSW">NSW</option>
                <option value="ACT">ACT</option>
                <option value="VIC">VIC</option>
                <option value="Tasmania">Tasmania</option>
                <option value="WesternAustralia">Western Australia</option>
                <option value="SouthAustralia">SouthAustralia</option>
              </Field>
            </Grid>
            <Grid item xs>
              <Field
                label="postCode"
                name="postCode"
                component={renderTextField}
                type="number"
                placeholder="Postal Code"
              />
            </Grid>
          </Grid>
        </div>

        <div
          style={{
            flexGrow: 1,
            marginTop: "2rem",
            marginLeft: "5rem",
            width: "25%",
          }}
        >
          <Grid container>
            <Grid item xs>
              <label>Description</label>
              <div>
                <Field name="description" component="textarea" />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};
  if (!Number(formValues.postCode)) {
    errors.postCode = "You must enter a Postcode";
  } else if (isNaN(Number(formValues.postCode))) {
    errors.postCode = "Must be a number";
  } else if (
    Number(formValues.postCode) <= 799 ||
    Number(formValues.postCode) >= 9999
  ) {
    errors.postCode = "Not a valid zip code";
  }
  if (!formValues.emailOptOut) {
    if (!formValues.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
    ) {
      errors.email = "Invalid email address";
    }
  }
  if (!Number(formValues.phoneNumber)) {
    errors.phoneNumber = "Required";
  } else if (formValues.phoneNumber.length !== 10) {
    errors.phoneNumber =
      "Incorrect phone number. Remeber it should start with zero.";
  } else if (isNaN(Number(formValues.phoneNumber))) {
    errors.postCode = "Must be a number";
  }

  return errors;
};

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
);
const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);
const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const renderSelectField = ({
  input,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="state-native-simple">State</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: "state",
        id: "state-native-simple",
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);
const mapStateToProps = (state) => {
  return {
    data: state.form.user,
  };
};
const connectComponentWithReduxForm = connect(mapStateToProps, {
  contactInformation,
})(Form);
export default reduxForm({
  form: "contactInformationForm",
  validate,
})(connectComponentWithReduxForm);
