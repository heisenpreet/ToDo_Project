import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CheckSVG from "../components/CheckSVG";
import CrossSVG from "../components/CrossSVG";
import DeleteSVG from "../components/DeleteSVG";
import EditSVG from "../components/EditSVG";
import Greatings from "../components/Greatings";
import { deleteTodo, pushInitial, toggleTodo } from "../slices/todoSlice";

//CONSTANTS
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const getInitialList = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!response.ok) {
      throw new Error("INITITAL LIST REQUEST FAILED");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ERROR AT GETTING INITIAL LIST", error);
  }
};

const TodoList = ({ navigation }) => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoSlice);

  const [searchInput, setSearchInput] = useState("");
  const [index, setIndex] = useState(10);

  const debounce = useRef(false);
  const searchRef = useRef();


// ------------------------------------------------------------------
  const listData = useMemo(() => {
    if (searchInput.trim().length > 0) {
      return todoList
        .filter((element) => {
          const title = element.title.toLowerCase();
          const searchString = searchInput.toLowerCase();
          return (
            title === searchString ||
            title.startsWith(searchString) ||
            title.endsWith(searchString)
          );
        })
        .slice(0, index);
    }
    return todoList.slice(0, index);
  }, [index, todoList, searchInput]);

  const serachFX = (text) => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }
    debounce.current = setTimeout(() => {
      setSearchInput(text);
    }, 300);
  };

// ----ACTIONS FX FOR TASK ACTIONS--------------------------------------------------------------
  const actionHandler = useCallback((action, index) => {
    switch (action) {
      case "DELETE":
        dispatch(deleteTodo(index));
        return;
      case "EDIT":
        navigation.navigate("addnew", { name: "Edit Task", index: index });
        return;
      case "TOGGLE":
        dispatch(toggleTodo(index));
        return;
    }
  }, []);

// ------------------------------------------------------------------
// UPDATING THE REDUX INITIAL STATE WITH API JSON
  useEffect(() => {
    getInitialList().then((data) => dispatch(pushInitial(data)));
  }, []);
  // -----------------------------------------------------------------
  //FLATLIST RENDER FUNCTION
  const renderItem = ({ item, index }) => {
    const { title, completed } = item;

    return (
      <View
        style={[
          styles.itemroot,
          styles[`${completed ? "" : "shadow"}`],
          {
            borderColor: completed ? "#fff" : "#fdba74",
            opacity: completed ? 0.9 : 1,
          },
        ]}
      >
        <View style={styles.itmtxtroot}>
          <View style={styles.tags}>
            <Text style={styles.itmtxtsub}>TASK:{index + 1}</Text>
            <Text style={[styles.itmtxtsub, { backgroundColor: "#fdba74" }]}>
              {completed ? "Finished" : "Pending"}
            </Text>
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itmTxt}>
            {title}
          </Text>
        </View>
        {completed ? (
          <TouchableOpacity onPress={() => actionHandler("TOGGLE", index)}>
            <CrossSVG />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => actionHandler("TOGGLE", index)}>
            <CheckSVG />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => actionHandler("EDIT", index)}>
          <EditSVG />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => actionHandler("DELETE", index)}>
          <DeleteSVG />
        </TouchableOpacity>
      </View>
    );
  };
  // -----------------------------------------------------------------
  //MAIN RETURN
  return (
    <View style={styles.root}>
      {/* -----------------------------x-x-x-x-x-x-x------------------------------- */}
      {/* GREATING HEADER */}
      <Greatings />
      {/* -----------------------------x-x-x-x-x-x-x------------------------------- */}
      {/* SEARCH BOX */}
      <View style={styles.searchroot}>
        <TextInput
          placeholder="Search.."
          style={styles.search}
          onChangeText={(text) => serachFX(text)}
          ref={searchRef}
        />

        <TouchableOpacity
          style={styles.searchclr}
          onPress={() => {
            setIndex(10);
            setSearchInput("");
            searchRef.current?.clear();
          }}
        >
          <CrossSVG size={40} color="#fdba74" />
        </TouchableOpacity>
      </View>
      {/* -----------------------------x-x-x-x-x-x-x------------------------------- */}
      {/* //TASK LIST */}
      <View style={styles.fLContainer}>
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id + Math.random()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return listData.length > 0 ? (
              <TouchableOpacity
                style={styles.loadMore}
                onPress={() => setIndex((prevState) => (prevState += 20))}
              >
                <Text style={styles.loadtxt}>Touch here load more..</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.loadMore}>
                <Text style={styles.loadtxt}>
                  No item , try clearing the search box
                </Text>
              </View>
            );
          }}
        />
      </View>
      {/* -----------------------------x-x-x-x-x-x-x------------------------------- */}
      {/* BUTTON FOR ADDING NEW TASK */}
      <TouchableOpacity
        style={[styles.btn, styles.shadow]}
        onPress={() => navigation.navigate("addnew", { name: "Add New Task" })}
      >
        <Text style={styles.btnText}>Create a new task</Text>
      </TouchableOpacity>
      <StatusBar />
      {/* -----------------------------x-x-x-x-x-x-x------------------------------- */}
    </View>
  );
};

export default React.memo(TodoList);

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    height: HEIGHT,
    width: WIDTH,
  },
  btn: {
    width: "90%",
    backgroundColor: "#4c7be6",
    padding: 20,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  fLContainer: {
    width: "95%",
    height: "65%",
    alignSelf: "center",
    backgroundColor: "#cffafe",
    padding: 10,
    borderRadius: 10,
  },
  loadMore: {
    alignSelf: "center",
    padding: 15,
  },
  loadtxt: {
    color: "#9ca3af",
  },
  itemroot: {
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#fff",
  },
  itmtxtroot: {
    width: "65%",
  },
  itmtxtsub: {
    fontSize: 8,
    backgroundColor: "#a5f3fc",
    width: 60,
    padding: 3,
    textAlign: "center",
    borderRadius: 20,
  },
  itmTxt: {
    color: "#1f2937",
    textTransform: "capitalize",
  },
  shadow: {
    borderRadius: 10,
    shadowColor: "#d4d4d4",
    shadowOffset: {
      width: 0,
      height: 55,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5.62,
    elevation: 6,
  },
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  searchroot: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 20,
  },
  search: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#fff7ed",
    paddingVertical: 10,
    borderRadius: 50,
    paddingHorizontal: 20,
    color: "#1f2937",
  },
  searchclr: {
    position: "absolute",
    right: 5,
    top: 5,
  },
});
