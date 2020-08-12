import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import {
  Button,
  Footer,
  FooterTab,
  Icon,
  Container,
  Content,
} from "native-base";
import { getMovies } from "../redux/actions/movies";
export default function User({ navigation }) {
  const data = useSelector((store) => store.login.data);
  const movies = useSelector((store) => store.movies.moviesUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies(Array.from(new Set(data.moviesID))));
  }, [movies.length, data.moviesID.length]);

  return (
    <Container style={styles.rootContainer}>
      <Content>
        <View style={styles.containerText}>
          <Text style={styles.title}>Hello {data.email} </Text>
          <Text style={styles.title}>This is your personal profile</Text>
          <Text style={styles.title}>We're going to add new features soon</Text>
        </View>
      </Content>

      <Footer>
        <FooterTab style={styles.footerTAB}>
          <Button vertical active>
            <Icon name="person" />
            <Text style={styles.text}>Profile</Text>
          </Button>
          <Button
            vertical
            onPress={() => {
              navigation.navigate("Movies");
            }}
          >
            <Icon active name="easel" />
            <Text style={styles.text}>Movies</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "black",
  },
  root: {
    flex: 1,
    alignItems: "center",
  },
  footerTAB: {
    color: "red",
  },
  containerText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: "white",
  },
  text: {
    color: "white",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  button: {
    marginBottom: 50,
  },
  textDelete: {
    color: "white",
    fontSize: 20,
  },
});
