import {
  Container,
  Grid,
  withStyles,
  Typography,
  FormLabel,
  Input,
} from "@material-ui/core";
import "./Components.css";
import { styles } from "../../assets/styles/Styles";
import { useState, useEffect } from "react";
import userServices from "../../services/user";

// Alterando css de componentes

const RevisionHeader = (props) => {
  const { classes, setRevHeader } = props;
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const [infoHeader, setInfoheader] = useState();
  const [resp, setResp] = useState("");
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    userServices.pegarUsuario(props.resp)
    .then(res => { setResp(res.data.usuNome) })


  }, [])

  const dat = {
    revPrazo: "",
    revData: "",
  }

  const alt = () => {
    const header = {
      revId: "",
      ...dat,
      responsavelRevisoes: {usuId: props.resp},
      contemRevisoes: {ataId: props.ataid}
    }

      setInfoheader(header);
      setRevHeader(header);
  }

  return (
    <Container>
      <Grid container style={{ marginBottom: 10 }}>
        <Typography style={{ paddingLeft: 24, fontSize: "1.4rem" }}>
          Cabeçalho
          </Typography>
      </Grid>
      <Grid container>
        <Grid
          container
          className={classes.grid}
          alignItems="center"
          justify="center"
          style={{ paddingTop: 15, paddingBottom: 15 }}
        >
          {/* CONTEINER DA DIREITA (INFOS)*/}
          <Grid item xs={12} sm={10} md={5} lg={4}>
            <Grid item xs={11} md={12} lg={12}>
              {/* ROW ATA REF */}
              <Grid sm={12} container className={classes.rowMargin} justify={windowSize >= 960 ? "flex-start" : "center"}>
                <Grid item xs={5} sm={4} md={12} lg={4} className="align-self-center" justify={windowSize >= 960 ? "flex-start" : "center"}>
                  <FormLabel className={classes.normalText}>
                    Ata Ref.
                  </FormLabel>
                </Grid>
                {/* <Grid item xs={12} lg={6} className="align-self-center">
                  <Grid container justify={windowSize >= 960 ? "space-between" : "center"}> */}
                <Grid item sm={3} md={12} lg={3} className="align-self-center" justify={windowSize >= 960 ? "flex-start" : "center"} alignItems="center">
                  <FormLabel className={classes.normalText}>
                    <strong>{props.ataid}</strong>
                  </FormLabel>
                </Grid>
                {/* </Grid>
                </Grid> */}
              </Grid>
              {/* ROW PRAZO */}
              <Grid container xs={12} sm={12} className={classes.rowMargin} justify={windowSize >= 960 ? "flex-start" : "center"}>
                <Grid item xs={4} sm={3} md={4} lg={3}>
                  <FormLabel className={classes.normalText}>
                    Prazo
                  </FormLabel>
                </Grid>
                <Grid item xs={6} sm={6} md={12} lg={6} justify={windowSize >= 960 ? "flex-start" : "center"} alignItems="center">
                  <Grid item xs={12} sm={12} md={6} lg={11}>
                    <Input
                      required
                      className={classes.textField}
                      disableUnderline
                      type="date"
                      onChange={e => {
                        dat.revData = e.target.value;
                        dat.revPrazo = e.target.value;
                        alt()
                        
                        
                        
                        
                      }}
                      
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Grid item xs={11} md={10} lg={12}>
              {/* ROW RESPONSAVEL*/}
              <Grid container className={classes.rowMargin} justify={windowSize >= 960 ? "flex-start" : "center"}>
                <Grid item md={12}>
                  <FormLabel className={classes.normalText}>
                    Responsável
                  </FormLabel>
                </Grid>
              </Grid>
              <Grid container className={classes.rowMargin} justify="center">
                <Grid item md={12} justify="center">
                  <FormLabel className={classes.normalText}><strong>{resp}</strong></FormLabel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container >
  );
};

export default withStyles(styles, { withTheme: true })(RevisionHeader);
