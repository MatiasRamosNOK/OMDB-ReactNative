import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ActivityIndicator, Keyboard } from "react-native";
import { Image, Icon } from "react-native-elements";
import { Input } from "react-native-elements";
import { fetchMovies, setIDMovie } from "../redux/actions/movies";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function Main({ navigation }) {
  const movies = useSelector((store) => store.movies);
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

  useEffect(() => {}, [movies.movies.Search]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.inputUser}>
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
                  style={{
                    width: windowWidth * 0.7,
                    height: windowHeight * 0.7,
                    marginBottom: 50,
                  }}
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
