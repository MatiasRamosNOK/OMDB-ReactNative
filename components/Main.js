import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { ActivityIndicator, Keyboard } from "react-native";
import { Image, Icon } from "react-native-elements";
import { Input } from "react-native-elements";
import { fetchMovies, setIDMovie } from "../redux/actions/movies";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function Main({ navigation }) {
  const login = useSelector((store) => store.login.succesfull);
  const movies = useSelector((store) => store.movies);
  const [showWelcome, setShowWelcome] = React.useState(true);
  const [name, setName] = React.useState("");

  const dispatch = useDispatch();
  const lookInfo = () => {
    if (name != "") {
      dispatch(fetchMovies(name));
      Keyboard.dismiss();
    }
  };

  const goToSingle = (elem) => {
    dispatch(setIDMovie(elem.imdbID));
    navigation.navigate("Single", { title: elem.Title });
  };

  useEffect(() => {
    if (login && showWelcome) {
      showMessage({
        message: "Hello",
        description: "You are loggin now",
        type: "success",
      });
      setShowWelcome(false);
    }
    if (login == null) {
      setShowWelcome(true);
    }
  }, [movies.movies.Search, login]);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.containerImages}>
        <Input
          onSubmitEditing={() => {
            if (name != "") {
              dispatch(fetchMovies(name));
            }
          }}
          placeholderTextColor={"gray"}
          placeholder="Movie"
          onChange={(e) => {
            setName(e.nativeEvent.text);
          }}
          inputStyle={styles.input}
          rightIcon={
            <Icon name="search" size={30} onPress={lookInfo} color={"white"} />
          }
        />

        {movies.movies.Search &&
          movies.movies.Search.map((elem) => {
            return (
              <TouchableOpacity
                key={elem.imdbID}
                activeOpacity={1}
                onPress={() => goToSingle(elem)}
              >
                <Image
                  source={{ uri: elem.Poster }}
                  style={{
                    width: windowWidth * 0.7,
                    height: windowHeight * 0.5,
                    marginBottom: 50,
                    resizeMode: "stretch",
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </TouchableOpacity>
            );
          })}
        {movies.movies.Search && movies.movies.Search.length ? (
          <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
            Hey this is the end
          </Text>
        ) : null}

        {movies.movies.Response == "False" ? (
          <Text style={styles.error}>Hey we didn't found anything</Text>
        ) : null}
      </ScrollView>
      <FlashMessage
        position="bottom"
        animated={true}
        autoHide={true}
        duration={1500}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "black",
  },
  error: {
    color: "white",
    fontSize: 25,
  },
  container: {
    flex: 1,
  },
  image: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inputNone: {
    marginTop: 15,
  },
  inputUser: {
    marginTop: 15,

    color: "white",
  },
  input: {
    marginTop: 15,
    color: "white",
  },
  icon: {
    color: "white",
  },
  containerImages: {
    justifyContent: "center",
    alignItems: "center",
  },
});
