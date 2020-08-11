import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
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
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMovies } from "../redux/actions/movies";
import { deleteFavorite } from "../redux/actions/login";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function Movies({ navigation }) {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.login.data);
  const movies = useSelector((store) => store.movies.moviesUser);
  useEffect(() => {
    dispatch(getMovies(Array.from(new Set(data.moviesID))));
  }, [movies.length, data.moviesID.length]);

  return (
    <Container>
      <Content style={styles.container}>
        <ScrollView>
          <View style={styles.root}>
            {movies.length == 0 ? (
              <View style={styles.empty}>
                <Text style={styles.textDelete}>
                  Empty: Add something first
                </Text>
              </View>
            ) : null}
            {movies &&
              movies.map((movie, index) => {
                return (
                  <TouchableOpacity key={index} activeOpacity={1}>
                    <Image
                      source={{ uri: `${movie.Poster}` }}
                      style={{
                        width: windowWidth * 0.7,
                        height: windowHeight * 0.7,
                        resizeMode: "contain",
                      }}
                    />
                    <Button
                      block
                      danger
                      style={{ marginBottom: 30 }}
                      onPress={() => {
                        dispatch(deleteFavorite(data.id, movie.imdbID));
                      }}
                    >
                      <Text style={styles.textDelete}>Delete</Text>
                    </Button>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            vertical
            onPress={() => {
              navigation.navigate("User");
            }}
          >
            <Icon name="person" />
            <Text style={styles.text}>Profile</Text>
          </Button>
          <Button vertical active>
            <Icon active name="easel" />
            <Text style={styles.text}>Movies</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    marginTop: 20,
  },
  container: {
    backgroundColor: "black",
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: "white",
  },
  button: {
    marginBottom: 30,
  },
  textDelete: {
    color: "white",
    fontSize: 20,
  },
  text: {
    color: "white",
  },
  empty: {
    flex: 1,
  },
});
