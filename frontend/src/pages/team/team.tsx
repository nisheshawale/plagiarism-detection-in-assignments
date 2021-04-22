import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { GitHub, LinkedIn, MailOutline } from "@material-ui/icons";
import React from "react";

interface SingleMember {
  name: string;
  designation: string;
  gitHub: string;
  linkedIn?: string;
  email?: string;
}

const members: SingleMember[] = [
  {
    name: "Bibek Timsina",
    designation: "Frontend Engineer",
    gitHub: "bimsina",
    linkedIn: "bimsina",
    email: "073bex409.bibek@pcampus.edu.np",
  },
  {
    name: "Mitesh Pandey",
    designation: "AI engineer",
    gitHub: "davidmitesh",
    email: "073bex417.mitesh@pcampus.edu.np",
  },
  {
    name: "Nishesh Awale",
    designation: "AI engineer",
    gitHub: "nisheshawale",
    email: "073bex423.nishesh@pcampus.edu.np",
  },
  {
    name: "Anish Dulal",
    designation: "AI Engineer",
    gitHub: "anishdulal",
    email: "073bex406.anish@pcampus.edu.np",
  },
];

const Team = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Team
      </Typography>
      <Grid container spacing={10} justify="center">
        {members.map((member) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={4} variant="outlined">
              <CardContent
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  alt={member.name}
                  src={"https://github.com/" + member.gitHub + ".png"}
                  style={{
                    width: "80%",
                    height: "80%",
                    margin: "auto",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                />
                <Typography
                  variant="h5"
                  style={{
                    marginTop: 24,
                  }}
                >
                  {member.name}
                </Typography>

                <Typography variant="subtitle1">
                  {member.designation}
                </Typography>
              </CardContent>

              <CardActionArea
                disableRipple
                disableTouchRipple
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {member.linkedIn && (
                  <IconButton
                    onClick={() => {
                      window.open(
                        `https://linkedin.com/in/${member.linkedIn}`,
                        "_blank"
                      );
                    }}
                  >
                    <LinkedIn />
                  </IconButton>
                )}

                {member.gitHub && (
                  <IconButton
                    onClick={() => {
                      window.open(
                        `https://github.com/${member.gitHub}`,
                        "_blank"
                      );
                    }}
                  >
                    <GitHub />
                  </IconButton>
                )}

                {member.email && (
                  <IconButton
                    onClick={() => {
                      window.open(`mailto:${member.email}`);
                    }}
                  >
                    <MailOutline />
                  </IconButton>
                )}
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default Team;
