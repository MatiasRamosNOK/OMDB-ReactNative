import React, { useEffect } from "react";
import background from "../assets/login.jpg";
import { ActivityIndicator, Keyboard, Dimensions, Alert } from "react-native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import { setSuccesfullNull } from "../redux/actions/register";
import { Spinner } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import GradientButton from "react-native-gradient-buttons";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { logginUser } from "../redux/actions/login";
import { set } from "react-native-reanimated";
import { resetSuccesfull } from "../redux/actions/login";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function Login({ navigation }) {
  const succesfulRegister = useSelector((store) => store.register.succesfull);
  const registration = useSelector((store) => store.register.succesfull);
  const loginStatus = useSelector((store) => store.login.succesfull);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [waiting, setWaiting] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState("");
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
    } else if (
      !email.includes("@") ||
      !email.slice(email.indexOf("@"), email.length).includes(".")
    ) {
      setErrorEmail("Email is not valid");
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
        dispatch(resetSuccesfull());
        return loginFail();
      }
    }
  }, [loginStatus]);
  return (
    <View style={styles.root}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        {waiting ? (
          <View>
            <Spinner color="blue" />
          </View>
        ) : (
          <View>
            {loginStatus ? null : (
              <View style={styles.containerInfo}>
                <View style={styles.email}>
                  {registration ? (
                    <Text style={styles.textCredentials}>
                      Please log in with your credentials
                    </Text>
                  ) : null}
                  <Text style={styles.textEmail}>Email</Text>
                  <Input
                    placeholderTextColor={"gray"}
                    placeholder="abc@example.com"
                    leftIcon={{
                      type: "font-awesome",
                      name: "envelope",
                      color: "white",
                    }}
                    style={styles}
                    onChangeText={(value) => setEmail(value)}
                    inputStyle={styles.textInput}
                    errorMessage={errorEmail}
                  />
                </View>
                <View style={styles.password}>
                  <Text style={styles.textPassword}>Password</Text>
                  <Input
                    placeholderTextColor={"gray"}
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
              </View>
            )}
            <View style={styles.contenedorBotones}>
              <GradientButton
                style={styles.button}
                text="Login"
                textStyle={{ fontSize: 20 }}
                gradientBegin="#217CA9"
                gradientEnd="#130C67"
                height={60}
                width={windowWidth * 0.8}
                radius={15}
                impact
                impactStyle="Light"
                onPressAction={() => checkData()}
              />

              <Text style={{ color: "black", fontSize: 20, marginBottom: 10 }}>
                or
              </Text>

              <GradientButton
                style={styles.button}
                text="Register"
                textStyle={{ fontSize: 20 }}
                gradientBegin="#217CA9"
                gradientEnd="#130C67"
                height={60}
                width={windowWidth * 0.8}
                radius={15}
                impact
                impactStyle="Light"
                onPressAction={() => {
                  if (succesfulRegister) {
                    dispatch(setSuccesfullNull());
                  }
                  navigation.navigate("Register");
                }}
              />
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  containerInfo: {
    marginTop: 150,
    opacity: 0.9,
    borderRadius: 10,
    width: windowWidth * 0.9,
    backgroundColor: "#0D0B0F",
  },
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  contenedorBotones: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  email: {
    marginTop: 10,
    width: windowWidth * 0.9,
  },
  backgroundImage: {
    flex: 1,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  password: {
    width: windowWidth * 0.9,
  },
  textEmail: {
    width: windowWidth * 0.8,
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
