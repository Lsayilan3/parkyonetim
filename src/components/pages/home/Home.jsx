import React from "react";
import Sidenav from "../../layouts/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../layouts/Navbar";
// import AccordionDash from "../components/AccordionDash";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "../../../Dash.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Redirect } from "react-router-dom";
// import BarChart from "../charts/BarChart";
// import CountUp from 'react-countup';

export default function Home() {

  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <>
    <div className="bgcolor">
    <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Stack spacing={2} direction="row">
                <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradient">
                  <CardContent>
                    <div className="iconstyle">
                      <CreditCardIcon />
                    </div>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                      {/* $ <CountUp delay={0.4} end={500} duration={0.6}/> */}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{ color: "#ccd1d1" }}
                    >
                      Total Earnings
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradientlight">
                  <CardContent>
                    <div className="iconstyle">
                      <ShoppingBagIcon />
                    </div>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                      {/* $ <CountUp delay={0.4} end={900} duration={0.6}/> */}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{ color: "#ccd1d1" }}
                    >
                      Total Orders
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid xs={4}>
              <Stack spacing={2}>
                <Card  className="gradientlight" >
                  <Stack spacing={2} direction="row">
                    <div className="iconstyle">
                      <StorefrontIcon />
                    </div>
                    <div className="paddingall">
                      <span className="pricetitle">$203K </span>
                      <br />
                      <span className="priceubtitle">Total Income</span>
                    </div>
                  </Stack>
                </Card>
                <Card >
                  <Stack spacing={2} direction="row">
                    <div className="iconstyleblack">
                      <StorefrontIcon />
                    </div>
                    <div className="paddingall">
                      <span className="pricetitle">$203K </span>
                      <br />
                      <span className="priceubtitle">Total Income</span>
                    </div>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                {/* <BarChart/> */}
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                    <div className="paddingall">
                      <span className="pricetitle">Populer Products </span>
                    </div>
                {/* <AccordionDash/> */}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
    </>
  );
}
