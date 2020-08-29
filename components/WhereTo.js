import React from "react";
import { Icon } from "native-base";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
export default function whereTo() {
  const succesfull = useSelector((store) => store.login.succesfull);
  const navigation = useNavigation();
  return (
    <Icon
      name="person"
      style={{ marginRight: 18 }}
      onPress={(e) => {
        if (succesfull) {
          navigation.navigate("User");
        } else {
          navigation.navigate("Login");
        }
      }}
    />
  );
}
