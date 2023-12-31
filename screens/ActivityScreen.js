import { Icon } from "@rneui/base";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
} from "react-native";
import tw from "twrnc";
import LongDog from "../assets/images/longdog.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import WalkChart from "../components/WalkChart";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateStorage } from "../helpers/updateStorage";

const ActivityScreen = () => {
  const navigation = useNavigation();

  const currentPet = useSelector((state) => state.pets.currentPet);
  console.log("this is the curreent pte", currentPet);

  const [walkModalOpen, setWalkModalOpen] = useState(false);
  const [walkData, setWalkData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [walkGoal, setWalkGoal] = useState(30);
  const [streak, setStreak] = useState(0);

  // useEffect(() => {
  //   console.log("Updated walkData:", walkData);

  //   const updatedDetails = {
  //     petWalkInfo: {
  //       allWalkData: walkData,
  //       dailyWalkGoal: walkGoal,
  //       walkStreak: streak,
  //     },
  //   };
  //   updateStorage(currentPet.id, updatedDetails);

  //   console.log(updatedDetails);
  // }, [walkData, walkGoal]);

  useEffect(() => {
    // Fetch data and update walkData
    getData();
  }, []);

  const getData = async () => {
    const dataFromStorage = JSON.parse(await AsyncStorage.getItem("petData"));

    if (dataFromStorage && dataFromStorage.length > 0) {
      const currPetExercise = dataFromStorage[0]["petWalkInfo"];
      const allWalkData = currPetExercise["allWalkData"];
      const dailyWalkGoal = currPetExercise["dailyWalkGoal"];
      const walkStreak = currPetExercise["walkStreak"];

      setWalkData(allWalkData);
      setWalkGoal(dailyWalkGoal);
      setStreak(walkStreak);
    }
  };

  useEffect(() => {
    let newStreak = 0;
    for (let i = walkData.length - 1; i >= 0; i--) {
      if (parseInt(walkData[i]) >= walkGoal) {
        newStreak++;
      } else {
        break;
      }
    }
    setStreak(newStreak);
  }, walkData);

  const handleSubmit = async (values) => {
    console.log("handle submit fn: ", values);

    if (!currentPet) {
      console.log("currentPet is undefined");
      return;
    }

    const newData = [...walkData];
    const dayIndex = parseInt(values.walkDate);
    console.log(dayIndex);
    newData[dayIndex] = parseInt(values.walkLength);
    setWalkData(newData);

    console.log("Updated walkData:", walkData);

    const petWalkInfo = {
      allWalkData: walkData,
      dailyWalkGoal: walkGoal,
      walkStreak: streak,
    };
    updateStorage(currentPet.id, petWalkInfo);

    console.log(petWalkInfo);
  };

  return (
    <SafeAreaView style={tw` h-full`}>
      <ScrollView style={tw`w-[89%] mx-auto`}>
        <View style={tw`flex flex-row items-center justify-between mt-2 mb-5`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" type="antdesign" size={25} style={tw``} />
          </TouchableOpacity>
          <Text style={tw`text-xl font-semibold pr-2`}>Activity</Text>
          <Icon name="more-vertical" type="feather" size={25} style={tw``} />
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <View style={tw`flex items-center gap-y-2`}>
            <Image
              source={LongDog}
              style={{
                width: 230,
                height: 100,
                resizeMode: "cover",
              }}
            />
            <Text style={tw`text-2xl text-center p-1 font-bold underline`}>
              {currentPet.petName}
            </Text>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Daily Walk Goal:</Text>
              <Text style={tw`text-lg p-1`}>30 min</Text>
            </View>

            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Walking Streak:</Text>
              <Text style={tw`text-lg p-1`}>{streak} days</Text>
            </View>
            <TouchableOpacity
              onPress={() => setWalkModalOpen(!walkModalOpen)}
              style={tw`flex-row justify-between w-5/6 bg-[#53A2FF] rounded-lg py-2`}
            >
              <Text
                style={tw`text-lg font-bold text-white text-right w-full text-center p-1`}
              >
                Add New Walk
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={walkModalOpen}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setWalkModalOpen(!walkModalOpen);
          }}
        >
          {/* <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              onPressOut={() => setWalkModalOpen(false)}
            > */}
          <View style={tw`flex justify-center items-center mt-40`}>
            <View
              style={tw`bg-white border-2 border-[#53A2FF] rounded-lg w-2/3 py-8 items-center shadow-lg elevation-5`}
            >
              <TouchableOpacity
                style={tw`absolute right-4 top-2`}
                onPress={() => setWalkModalOpen(false)}
              >
                <View>
                  <Icon
                    name="close"
                    type="font-awesome"
                    size={25}
                    color="gray"
                  />
                </View>
              </TouchableOpacity>
              <Text
                style={tw`text-center text-2xl font-semibold text-slate-800`}
              >
                New Walk
              </Text>
              <Formik
                initialValues={{
                  walkDate: "1",
                  walkLength: "0",
                }}
                onSubmit={(values) => {
                  handleSubmit(values);
                  setWalkModalOpen(!walkModalOpen);
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                    <Text style={tw`text-lg mt-4 text-center`}>Day</Text>
                    <Picker
                      style={tw`border border-gray-300 mt-2`}
                      selectedValue={values.walkDate}
                      onValueChange={handleChange("walkDate")}
                    >
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday"].map(
                        (label, index) => (
                          <Picker.Item
                            key={index}
                            label={label}
                            value={index.toString()}
                          />
                        )
                      )}
                    </Picker>
                    <Text style={tw`text-lg mt-4 text-center`}>
                      Duration (min)
                    </Text>
                    <View style={tw`flex-row items-center mb-6`}>
                      <TextInput
                        style={tw`border border-gray-300 text-xl pb-4 pt-2 mt-2 flex-1 text-center`}
                        onChangeText={handleChange("walkLength")}
                        onBlur={handleBlur("walkLength")}
                        value={values.walkLength}
                        placeholder="20"
                        keyboardType="numeric"
                      />
                    </View>
                    <TouchableOpacity
                      style={tw`rounded-xl bg-[#53A2FF] px-3 py-2`}
                      onPress={handleSubmit}
                    >
                      <Text
                        style={tw`text-white font-bold text-center text-lg`}
                      >
                        Submit Walk
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </View>
          {/* </TouchableWithoutFeedback> */}
        </Modal>

        {walkData !== undefined && (
          <View style={tw`w-full mx-auto bg-white rounded-lg mb-5`}>
            <WalkChart walkData={walkData} />
          </View>
        )}

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg`}>
          <Text style={tw`text-xl text-center font-bold p-1 mt-1`}>
            Back to Homepage
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
            <View style={tw`bg-[#53A2FF] rounded-lg py-2 w-1/3 mt-1 mx-auto`}>
              <Icon
                name="arrow-right-circle"
                type="feather"
                size={25}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mt-5`}>
          <Text style={tw`text-xl text-center p-1 font-semibold`}>
            Obedience Training
          </Text>
          <Text style={tw`text-center text-lg`}>Coming soon!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ActivityScreen;
