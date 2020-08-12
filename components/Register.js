import React, { useEffect } from "react";
import background from "../assets/register.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  Dimensions,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
import { registerUser, resetEmail } from "../redux/actions/register";
import GradientButton from "react-native-gradient-buttons";
const windowWidth = Dimensions.get("window").width;

export default function Login({ navigation }) {
  const failRegistration = useSelector((store) => store.register.error);
  const succesfulRegister = useSelector((store) => store.register.succesfull);
  console.log("Fail", failRegistration, " Success:", succesfulRegister);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordTwo, setPasswordTwo] = React.useState("");
  const [waiting, setWaiting] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState("");
  const passwordInput = React.createRef();
  const passwordInputTwo = React.createRef();
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

  const passwordAlertTwo = () => {
    Alert.alert(
      "Password",
      "Please write your password again",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const checkData = () => {
    console.log("Entro a checkData");
    if (email == "" && password == "" && passwordTwo == "") {
      return twoButtonsAlert();
    } else if (email == "") {
      return emailAlert();
    } else if (password == "") {
      return passwordAlert();
    } else if (password != passwordTwo) {
      passwordInput.current.clear();
      passwordInputTwo.current.clear();
      return passwordAlertTwo();
    } else if (
      !email.includes("@") ||
      !email.slice(email.indexOf("@"), email.length).includes(".")
    ) {
      setErrorEmail("Email is not valid");
    } else {
      setErrorEmail("");
      setWaiting(true);
      dispatch(
        registerUser({ email: email.toLocaleLowerCase(), password: password })
      );
    }
  };

  useEffect(() => {
    if (failRegistration == "EmailUsed") {
      setWaiting(false);
      setErrorEmail("Email already in use");
    }
    if (succesfulRegister) {
      setWaiting(false);
      navigation.navigate("Login");
    }
  }, [succesfulRegister, failRegistration, errorEmail]);

  return (
    <View style={styles.root}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        {waiting ? (
          <View>
            <ActivityIndicator size="large" color="#49E418" />
          </View>
        ) : (
          <>
            <View style={styles.container}>
              <View style={styles.email}>
                <Text style={styles.textEmail}>Email</Text>
                <Input
                  onPress={() => {
                    dispatch(resetEmail());
                  }}
                  placeholderTextColor={"gray"}
                  placeholder="abc@example.com"
                  leftIcon={{
                    type: "font-awesome",
                    name: "envelope",
                    color: "white",
                    marginRight: 4,
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
                    marginRight: 5,
                  }}
                  inputStyle={styles.textInput}
                  onChangeText={(value) => setPassword(value)}
                  secureTextEntry={true}
                  ref={passwordInput}
                />
              </View>
              <View style={styles.password}>
                <Text style={styles.textPassword}>Repet password</Text>
                <Input
                  placeholderTextColor={"gray"}
                  placeholder="Som3th1n!gS3c-re"
                  leftIcon={{
                    marginLeft: 6,
                    type: "font-awesome",
                    name: "lock",
                    color: "white",
                    marginRight: 5,
                  }}
                  inputStyle={styles.textInput}
                  onChangeText={(value) => setPasswordTwo(value)}
                  secureTextEntry={true}
                  ref={passwordInputTwo}
                />
              </View>
              <View style={styles.contenedorBotones}></View>
            </View>
            <GradientButton
              style={{ marginTop: 25 }}
              text="Register"
              textStyle={{ fontSize: 15 }}
              gradientBegin="#AF30CB"
              gradientEnd="#CB3082"
              height={60}
              width={windowWidth * 0.8}
              radius={15}
              impact
              impactStyle="Light"
              onPressAction={() => checkData()}
            />
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  container: {
    opacity: 0.9,
    marginTop: 180,
    backgroundColor: "#0D0B0F",
    borderRadius: 10,
    width: windowWidth * 0.9,
  },
  contenedorBotones: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
    width: 100,
    height: 40,
  },
  email: {
    marginTop: 10,
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
  textPassword: {
    marginLeft: 10,
    fontSize: 18,
    color: "lightblue",
  },
  textInput: {
    color: "white",
  },
});
