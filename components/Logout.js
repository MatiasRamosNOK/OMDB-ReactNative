import React from "react";
import { Alert } from "react-native";
import { Icon } from "native-base";
import { logoutUser } from "../redux/actions/login";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
export default function logout() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Logout",
      "Are you sure?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(logoutUser());
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: false }
    );
  return (
    <Icon
      name="exit"
      style={{ marginRight: 15 }}
      onPress={(e) => {
        createTwoButtonAlert();
        /*   */
      }}
    />
  );
}
