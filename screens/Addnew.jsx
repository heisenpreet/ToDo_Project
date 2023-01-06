import React, { useCallback, useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import LeafSVG from "../components/LeafSVG";
import { addTodo, editTodo } from "../slices/todoSlice";

const Addnew = ({ navigation, route }) => {
  const { index, name } = route.params;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const debounce = useRef(false);

  const textInputHanlder = (text) => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }
    debounce.current = setTimeout(() => {
      setTitle(text);
    }, 200);
  };

  const submit = useCallback(() => {
    if (title.trim().length > 0) {
      if (name === "Edit Task") {
       
        dispatch(editTodo({ index, title }));
        navigation.navigate("home");
        return;
      }
      dispatch(addTodo(title));
      navigation.navigate("home");
    }
  }, [title, index, name]);
  return (
    <View style={styles.root}>
      <View style={styles.cont}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          numberOfLines={1}
          onChangeText={(text) => textInputHanlder(text)}
        />
        <TouchableOpacity style={[styles.btn, styles.shadow]} onPress={submit}>
          <Text style={styles.btnText}>Add new task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.leaf}>
        <LeafSVG />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
  },
  cont: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 30,
    padding: 10,
  },
  input: {
    backgroundColor: "#a5f3fc",
    padding: 20,
    borderRadius: 10,
    color: "#1f2937",
  },
  btn: {
    width: "100%",
    backgroundColor: "#4c7be6",
    padding: 20,
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  shadow: {
    borderRadius: 10,
    shadowColor: "#d4d4d4",
    shadowOffset: {
      width: 0,
      height: 55,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 5,
  },
  leaf: {
    alignSelf: "center",
    marginBottom: "auto",
    opacity: 0.5,
  },
});

export default Addnew;
