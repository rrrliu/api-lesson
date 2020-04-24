import React, { useState, useEffect } from "react";
import Visualization from "./Visualization";
import "./App.css";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  AppBar,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Toolbar,
  Typography,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  MenuItem,
  TextField,
  Divider,
  Button,
} from "@material-ui/core";
import axios from "axios";
import states from "./us_states";

const styles = {
  card: {
    maxWidth: 500,
    margin: "50px auto",
  },
  divider: {
    margin: "10px 0",
  },
  cardActions: {
    justifyContent: "center",
  },
};

const axiosBase = axios.create({ baseURL: "http://localhost:8000" });

function InputCard(props) {
  const { classes } = props;
  const [entry, setEntry] = useState({ state: "", days: 0 });
  const [pastEntries, setPastEntries] = useState([]);
  const [state, setState] = useState("");
  const [days, setDays] = useState("");

  useEffect(() => {
    axiosBase
      .get("/entries")
      .then((res) => {
        setPastEntries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [entry]);

  const addEntry = () => {
    const entry = {
      state: state,
      days: days,
    };
    setEntry(entry);
    axiosBase.post("/save", entry);
  };

  const displayEntry = () => {
    if (entry.state && entry.days) {
      return <Visualization state={entry.state} days={entry.days} />;
    }
    return <div></div>;
  };

  const displayPastEntries = () => {
    const output = [];
    pastEntries.forEach((e) => {
      output.unshift(<Visualization state={e.state} days={e.days} />);
    });
    return output;
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Visualizations</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Card className={classes.card}>
          <CardHeader title="Visualize COVID-19 Data Per State" />
          <CardContent>
            <TextField
              id="state-select"
              select
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              helperText="Please select a state"
            >
              {states.map((option) => (
                <MenuItem key={option.abbreviation} value={option.abbreviation}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <Divider className={classes.divider} variant="middle" />
            <TextField
              id="standard-basic"
              label="Number of days"
              helperText="Please enter the number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button onClick={addEntry} color="primary">
              Add Visualization
            </Button>
          </CardActions>
        </Card>

        <div>{displayEntry()}</div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Past Visualizations
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{displayPastEntries()}</ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>
    </div>
  );
}

export default withStyles(styles)(InputCard);
