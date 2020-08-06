import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  Button,
  Footer,
  FooterTab,
  Icon,
  Container,
  Content,
  Tab,
  Tabs,
  TabHeading,
} from "native-base";
import { Image } from "react-native-elements";
import { getMovies } from "../redux/actions/movies";
import { ScrollView } from "react-native-gesture-handler";
import { deleteFavorite } from "../redux/actions/login";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
const windowHeight = Dimensions.get("window").height;
export default function User({ navigation }) {
  const data = useSelector((store) => store.login.data);
  const movies = useSelector((store) => store.movies.moviesUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies(Array.from(new Set(data.moviesID))));
  }, [movies.length, data.moviesID.length]);

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  function onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        console.log("SWipe up");

        break;
      case SWIPE_DOWN:
        console.log("SWipe down");

        break;
      case SWIPE_LEFT:
        navigation.navigate("Movies");
        break;
      case SWIPE_RIGHT:
        console.log("SWipe right");
        navigation.navigate("Home");
        break;
    }
  }
  return (
    <GestureRecognizer
      onSwipe={(direction, state) => {
        onSwipe(direction, state);
      }}
      config={config}
      style={{
        flex: 1,
      }}
    >
      <Container style={styles.rootContainer}>
        <Content>
          <View style={styles.containerText}>
            <Text style={styles.title}>Hello {data.email} </Text>
            <Text style={styles.title}>This is your personal profile</Text>
            <Text style={styles.title}>
              We're going to add new features soon
            </Text>
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
    </GestureRecognizer>
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