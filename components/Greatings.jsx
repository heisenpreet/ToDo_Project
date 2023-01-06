import React, { useMemo } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const Greatings = () => {
  const greetingMsg = useMemo(() => {
    const TIME = new Date().getHours();
    if (TIME >= 5 && TIME < 12) {
      return "Good Morning!";
    }
    if (TIME >= 12 && TIME < 18) {
      return "Good Afternoon!";
    }
    if (TIME >= 18 && TIME < 20) {
      return "Good Evening!";
    } else {
      return "Hey!";
    }
  }, []);
  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.txt}>{greetingMsg}</Text>
        <Text style={styles.subtxt}>Harpreet</Text>
      </View>
      <Image
        source={{ uri: "https://placeimg.com/200/200/animals" }}
        style={styles.img}
        resizeMethod="auto"
        resizeMode="cover" 
        borderRadius={100}
        
      />
    </View>
  );
};

export default React.memo(Greatings);

const styles = StyleSheet.create({
  root: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txt: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1f2937",
  },
  subtxt:{
    color:"#9ca3af"  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth:2,
    borderColor:"#fdba74"
  },
});
