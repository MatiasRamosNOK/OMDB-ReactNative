import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Keyboard, Dimensions, Alert } from "react-native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import { Spinner } from "native-base";
import { registerUser } from "../redux/actions/register";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function Login({ navigation }) {
  const failRegistration = useSelector((store) => store.register.error);
  const succesfulRegister = useSelector((store) => store.register.succesfull);
  console.log("Fail", failRegistration, " Success:", succesfulRegister);
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
      console.log("Entro al if afuera del useEffect2");
      setWaiting(false);
      navigation.navigate("Login");
    }
  }, [succesfulRegister, failRegistration]);

  return (
    <View style={styles.root}>
      {waiting ? (
        <View>
          <Spinner color="blue" />
        </View>
      ) : (
        <View>
          <View style={styles.email}>
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
          <View style={styles.contenedorBotones}>
            <Button
              title="Register"
              buttonStyle={styles.button}
              onPress={() => {
                checkData();
              }}
            />
          </View>
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
    marginBottom: 10,
  },
  password: {
    width: windowWidth * 0.9,
    marginBottom: 10,
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
