import React from "react";
import { Icon } from "native-base";
import { logoutUser } from "../redux/actions/login";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
export default function logout() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Icon
      name="exit"
      style={{ marginRight: 15 }}
      onPress={(e) => {
        dispatch(logoutUser());
        navigation.navigate("Home");
      }}
    />
  );
}
