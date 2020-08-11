import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Button } from "native-base";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { fetchMovie, resetMovie } from "../redux/actions/movies";
import { addFavorite } from "../redux/actions/login";
import { ActivityIndicator, Keyboard, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function Single() {
  const IDmovie = useSelector((store) => store.movies.id);
  const movie = useSelector((store) => store.movies.movie);
  const loginStatus = useSelector((store) => store.login.succesfull);
  const dataUser = useSelector((store) => store.login.data);
  console.log("Data user:", dataUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovie(IDmovie));
  }, [movie.length, IDmovie]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.root}>
          {movie.imdbID == IDmovie && movie && Object.keys(movie).length ? (
            <View style={styles.rootContainer}>
              <Image
                source={{ uri: movie.Poster }}
                style={styles.imagen}
                PlaceholderContent={<ActivityIndicator />}
              />

              {loginStatus &&
              Object.keys(dataUser).includes("moviesID") &&
              !dataUser.moviesID.includes(movie.imdbID) ? (
                <View style={styles.buttonContainer}>
                  <Button
                    info
                    full
                    onPress={() => {
                      dispatch(addFavorite(dataUser.id, movie.imdbID));
                    }}
                  >
                    <Text style={styles.textButton}> Add to favorite </Text>
                  </Button>
                </View>
              ) : null}

              {dataUser.moviesID.includes(movie.imdbID) ? (
                <View style={styles.buttonContainer}>
                  <Button full success>
                    <Text style={styles.textButton}>Success</Text>
                  </Button>
                </View>
              ) : null}

              {Object.keys(movie).map(function (key, index) {
                if (key != "Poster" && key != "Ratings" && key != "Response") {
                  return (
                    <View style={styles.contenedorInfo} key={index}>
                      <Text style={styles.infoTitle}>{key.toString()}</Text>
                      <Text style={styles.info}>{movie[key].toString()}</Text>
                    </View>
                  );
                }
              })}
            </View>
          ) : (
            <View style={styles.waitingContainer}>
              <Spinner color="blue" />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonFavorite: {
    height: 10,
  },
  imagen: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.6,
    marginBottom: 15,
    resizeMode: "stretch",
  },
  buttonContainer: {
    width: windowWidth / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
  },
  rootContainer: {
    height: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  infoText: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  info: {
    color: "white",
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  contenedorInfo: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  waitingContainer: {
    height: windowHeight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "white",
  },
  textButtonDone: {
    fontSize: 20,
    color: "white",
  },
  buttonDone: {
    color: "white",
  },
});
