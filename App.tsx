import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Image, Appearance } from "react-native";
import { CheckBox, Icon, Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { initialTask } from "./mockUp";

const App = () => {
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [showInput, setShowInput] = useState<boolean>(false);

  const [form, setForm] = useState({
    title: "",
    completed: false,
  });
  const [taskList, setTaskList] = useState<ITask[]>(initialTask);

  const LoadTask = async () => {
    try {
      const data = await AsyncStorage.getItem("storedTask");
      if (data !== null) {
        setTaskList(JSON.parse(data));
      }
    } catch (err) {
      alert(err);
    }
  };

  const addTask = (todo: any) => {
    const newTask = [...taskList, todo];

    AsyncStorage.setItem("storedTask", JSON.stringify(newTask))
      .then(() => {
        setTaskList(newTask);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deleteTask = (title: string) => {
    const newTask = [...taskList];
    const taskIndex = taskList.findIndex((task) => task.title === title);
    newTask.splice(taskIndex, 1);

    AsyncStorage.setItem("storedTask", JSON.stringify(newTask))
      .then(() => {
        setTaskList(newTask);
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (!ready) {
    return (
      <AppLoading
        startAsync={LoadTask}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  const editTask = (editedTask: ITask) => {
    const newTask = [...taskList];
    const taskIndex = taskList.findIndex(
      (task) => task.title === editedTask.title
    );
    newTask.splice(taskIndex, 1, editedTask);

    AsyncStorage.setItem("storedTask", JSON.stringify(newTask))
      .then(() => {
        setTaskList(newTask);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSubmit = () => {
    if (!form.title) {
      setShowInput(false);
    } else {
      addTask(form);
      setShowInput(false);
      setForm({
        title: "",
        completed: false,
      });
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#0F4C75" : "#BBE1FA",
    },
    header: {
      flex: 0.25,
      justifyContent: "flex-end",
      paddingLeft: 20,
      paddingBottom: 10,
    },
    headerText: {
      fontSize: 26,
      color: theme === "dark" ? "#fff" : "#1B262C",
      fontWeight: "bold",
    },
    avatar: {
      width: 80,
      height: 80,
      marginBottom: 5,
      borderRadius: 90 / 2,
    },
    content: {
      backgroundColor: theme === "dark" ? "#222831" : "#DDDDDD",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      flex: 0.75,
    },
    contentHeader: {
      fontSize: 18,
      marginLeft: 40,
      marginTop: 20,
      fontWeight: "bold",
      color: theme === "dark" ? "#fff" : "#1B262C",
    },
    input: {
      color: theme === "dark" ? "#fff" : "#000",
    },
    contentInput: {
      width: 385,
      marginTop: 10,
      marginLeft: 10,
      marginBottom: -20,
    },
    tasks: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingRight: 20,
    },
    checkBox: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    checkBoxTextDarkUncheck: {
      color: "#3282B8",
      textDecorationLine: "none",
      textDecorationStyle: "solid",
      opacity: 1,
    },
    checkBoxTextDarkCheck: {
      color: "#BBE1FA",
      textDecorationLine: "line-through",
      textDecorationStyle: "solid",
      opacity: 0.5,
    },
    checkBoxTextLightUncheck: {
      color: "#1B262C",
      textDecorationLine: "none",
      textDecorationStyle: "solid",
      opacity: 1,
    },
    checkBoxTextLightCheck: {
      color: "#0F4C75",
      textDecorationLine: "line-through",
      textDecorationStyle: "solid",
      opacity: 0.5,
    },
    actionBar: {
      flex: 0.1,
      backgroundColor: theme === "dark" ? "#222831" : "#DDDDDD",
      alignItems: "flex-end",
      paddingBottom: 10,
      paddingRight: 10,
    },
  });

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={require("./images/avatar.jpeg")}
          />
          <Text style={styles.headerText}>Hi, Phubordin</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentHeader}>Todo</Text>
          {showInput ? (
            <Input
              placeholder="Add a Task"
              style={styles.input}
              containerStyle={styles.contentInput}
              onChangeText={(text) =>
                setForm({
                  title: text,
                  completed: false,
                })
              }
            />
          ) : null}
          {taskList.map((item: ITask, index: number) => (
            <View style={styles.tasks} key={index++}>
              <CheckBox
                title={item.title}
                checked={item.completed}
                onPress={() => {
                  editTask({
                    title: item.title,
                    completed: !item.completed,
                  });
                }}
                checkedColor={theme === "dark" ? "#BBE1FA" : "#3282B8"}
                uncheckedColor={theme === "dark" ? "#3282B8" : "#1B262C"}
                containerStyle={styles.checkBox}
                textStyle={
                  theme === "dark"
                    ? item.completed
                      ? styles.checkBoxTextDarkCheck
                      : styles.checkBoxTextDarkUncheck
                    : item.completed
                    ? styles.checkBoxTextLightCheck
                    : styles.checkBoxTextLightUncheck
                }
              />
              <Icon
                name="delete"
                onPress={() => deleteTask(item.title)}
                type="material"
                color="#517fa4"
              />
            </View>
          ))}
        </View>
        <View style={styles.actionBar}>
          <Icon
            reverse
            name={showInput ? "done" : "add"}
            type="material"
            color="#517fa4"
            onPress={() => {
              setShowInput(true);
              if (showInput) {
                handleSubmit();
              }
            }}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
};

export default App;

interface ITask {
  title: string;
  completed: boolean;
}
