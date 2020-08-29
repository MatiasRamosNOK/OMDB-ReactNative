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
import StarRating from "react-native-star-rating";
import { useEffect } from "react";
import { getMovies } from "../redux/actions/movies";
import { deleteFavorite, setIDonServer } from "../redux/actions/login";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function Movies({ navigation }) {
  const dispatch = useDispatch();
  const [star, setStar] = React.useState(0);
  const data = useSelector((store) => store.login.data);
  const movies = useSelector((store) => store.movies.moviesUser);
  const ratings = useSelector((store) => store.login.data.ratings);
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
                        height: windowHeight * 0.5,
                        resizeMode: "stretch",
                        marginBottom: 15,
                      }}
                    />
                    {ratings.filter((x) => x.moviesID == movie.imdbID)
                      .length ? (
                      <StarRating
                        disabled={false}
                        maxStars={5}
                        fullStarColor={"#E4AF18"}
                        starSize={30}
                        rating={
                          ratings.length
                            ? ratings.filter(
                                (x) => x.moviesID == movie.imdbID
                              )[0].number
                            : 0
                        }
                        selectedStar={(rating) => {
                          dispatch(
                            setIDonServer(data.id, movie.imdbID, rating)
                          );
                        }}
                      />
                    ) : null}

                    <Button
                      block
                      danger
                      style={{ marginBottom: 20, marginTop: 10 }}
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
        <FooterTab style={styles.footerTAB}>
          <Button
            vertical
            onPress={() => {
              navigation.navigate("User");
            }}
          >
            <Icon name="person" style={{ color: "black" }} />
            <Text style={styles.text}>Profile</Text>
          </Button>
          <Button vertical>
            <Icon active name="easel" style={{ color: "blue" }} />
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
  footerTAB: {
    backgroundColor: "white",
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
    color: "black",
  },
  empty: {
    flex: 1,
  },
});
