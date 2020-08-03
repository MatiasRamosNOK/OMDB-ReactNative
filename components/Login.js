import React, { useEffect } from "react";
import { ActivityIndicator, Keyboard, Dimensions, Alert } from "react-native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Spinner } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { logginUser } from "../redux/actions/login";
import { set } from "react-native-reanimated";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function Login({ navigation }) {
  const registration = useSelector((store) => store.register.succesfull);
  const loginStatus = useSelector((store) => store.login.succesfull);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [waiting, setWaiting] = React.useState(false);
  const dispatch = useDispatch();
  const twoButtonsAlert = () => {
    Alert.alert(
      "Something is wrong!",
      "Email and password field should be complete!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const emailAlert = () => {
    Alert.alert(
      "Something is wrong!",
      "Email field should be complete!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const passwordAlert = () => {
    Alert.alert(
      "Something is wrong!",
      "Password field should be complete!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const loginFail = () => {
    Alert.alert(
      "Fail",
      "Username or password is wrong",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const checkData = () => {
    console.log("Entro a checkData");
    if (email == "" && password == "") {
      return twoButtonsAlert();
    } else if (email == "") {
      return emailAlert();
    } else if (password == "") {
      return passwordAlert();
    } else {
      setWaiting(true);
      dispatch(
        logginUser({ email: email.toLocaleLowerCase(), password: password })
      );
    }
  };

  useEffect(() => {
    if (loginStatus) {
      navigation.navigate("Home");
    } else {
      if (loginStatus == false) {
        console.log("Entro en loginFalse");
        setWaiting(false);
        setEmail("");
        setPassword("");
        return loginFail();
      }
    }
  }, [loginStatus]);
  return (
    <View style={styles.root}>
      {waiting ? (
        <View>
          <Spinner color="blue" />
        </View>
      ) : (
        <View>
          {loginStatus ? null : (
            <View>
              <View style={styles.email}>
                {registration ? (
                  <Text style={styles.textCredentials}>
                    Please log in with your credentials
                  </Text>
                ) : null}
                <Text style={styles.textEmail}>Email</Text>
                <Input
                  placeholder="abc@example.com"
                  leftIcon={{
                    type: "font-awesome",
                    name: "envelope",
                    color: "white",
                  }}
                  style={styles}
                  onChangeText={(value) => setEmail(value)}
                  inputStyle={styles.textInput}
                />
              </View>
              <View style={styles.password}>
                <Text style={styles.textPassword}>Password</Text>
                <Input
                  placeholder="Som3th1n!gS3c-re"
                  leftIcon={{
                    marginLeft: 6,
                    type: "font-awesome",
                    name: "lock",
                    color: "white",
                    marginRight: 4,
                  }}
                  inputStyle={styles.textInput}
                  onChangeText={(value) => setPassword(value)}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.contenedorBotones}>
                <Button
                  title="Login"
                  buttonStyle={styles.button}
                  onPress={() => {
                    checkData();
                  }}
                />
                {registration ? null : (
                  <Button
                    title="Register"
                    buttonStyle={styles.button}
                    onPress={() => {
                      navigation.navigate("Register");
                    }}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  contenedorBotones: {
    marginTop: 10,
    width: windowWidth * 0.9,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
    width: 100,
    height: 40,
  },
  email: {
    width: windowWidth * 0.9,
  },
  password: {
    width: windowWidth * 0.9,
  },
  textEmail: {
    marginLeft: 10,
    fontSize: 18,
    color: "lightblue",
  },
  textCredentials: {
    marginLeft: 10,
    fontSize: 18,
    color: "lightblue",
    marginBottom: 20,
  },
  textPassword: {
    marginLeft: 10,
    fontSize: 18,
    color: "lightblue",
  },
  textInput: {
    color: "white",
  },
});
