import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  SectionList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import { ActivityIndicator, Keyboard } from "react-native";
import { Image, Icon } from "react-native-elements";
import { Input } from "react-native-elements";
import { fetchMovies, setIDMovie } from "../redux/actions/movies";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
export default function Main({ navigation }) {
  const movies = useSelector((store) => store.movies);
  const loginStatus = useSelector((store) => store.login.succesfull);
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
        console.log("Entro en swipe left");
        console.log("Login status:", loginStatus);
        if (loginStatus) {
          navigation.navigate("User");
        } else {
          navigation.navigate("Login");
        }
        break;
      case SWIPE_RIGHT:
        console.log("SWipe right");
        break;
    }
  }

  useEffect(() => {
    // cleanup function
  }, [movies.movies.Search]);

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
      <SafeAreaView style={styles.root}>
        <View style={styles.inputUser}>
          <Input
            placeholder="Movie"
            onChange={(e) => {
              setName(e.nativeEvent.text);
            }}
            inputStyle={styles.input}
            rightIcon={
              <Icon
                name="search"
                size={30}
                onPress={lookInfo}
                color={"white"}
              />
            }
          />
        </View>

        <ScrollView contentContainerStyle={styles.containerImages}>
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
                    style={{ width: 300, height: 500, marginBottom: 50 }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </TouchableOpacity>
              );
            })}
          {movies.movies.Response == "False" ? (
            <Text style={styles.error}>Hey we didn't found anything</Text>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  root: {
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
  inputUser: {
    marginTop: 15,
    justifyContent: "space-between",
    color: "white",
  },
  input: {
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
