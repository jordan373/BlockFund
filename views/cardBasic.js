import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";

import styles from "../assets/jss/nextjs-material-dashboard/cardImagesStyles.js";

const useStyles = makeStyles(styles);

const cardStyle = { width: "20rem" };
const cardImgTopStyle = { height: "180px", width: "100%", display: "block" };

export default function CardBasic() {
  const classes = useStyles();
  return (
    <Card style={cardStyle}>
      <img
        className={classes.cardImgTop}
        alt="100%x180"
        style={cardImgTopStyle}
        src="../public/images/breakfast.jpg"
        data-holder-rendered="true"
      />
      <CardBody>
        <h4>Card title</h4>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <Button color="primary">Go somewhere</Button>
      </CardBody>
    </Card>
  );
}

