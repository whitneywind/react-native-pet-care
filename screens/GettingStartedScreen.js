import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Formik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import catImg from "../assets/images/graycat.png";
import dogImg from "../assets/images/longdog.png";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setPets } from "../slices/petsSlice";

const GettingStartedScreen = () => {
  const dispatch = useDispatch();

  const [selectedPet, setSelectedPet] = useState("");
  const [petGender, setPetGender] = useState("");
  // const navigation = useNavigation();

  let petData = null;

  useEffect(() => {
    getPetData();
  }, []);

  const getPetData = async () => {
    try {
      const value = await AsyncStorage.getItem("petData");
      if (value !== null) {
        console.log("existing petData: ", value);
        petData = JSON.parse(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setPetData = async (values) => {
    // TO-DO: try calling directly in here instead of outside variable by returning in getPetData and usign that returned value
    getPetData();

    if (petData) {
      petData.push({ ...values });
      // console.log("option1: ", petData);
    } else {
      petData = [{ ...values }];
      // console.log("option2: ", petData);
    }
    try {
      await AsyncStorage.setItem("petData", JSON.stringify(petData));
      const val = await AsyncStorage.getItem("petData");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={tw`h-full`}>
      <ScrollView contentContainerStyle={tw`w-7/8 mx-auto mt-10`}>
        <Text style={tw`text-3xl mb-6 text-center`}>
          Let's start with the basics
        </Text>
        <Formik
          initialValues={{
            petType: "",
            petName: "",
            petAgeYears: "",
            petAgeMonths: "",
          }}
          onSubmit={(values) => {
            // console.log(typeof values);
            setPetData(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View>
              <Text style={tw`text-lg mt-4`}>What is your pet's name? *</Text>
              <TextInput
                style={tw`border border-gray-300 p-2 mt-2 mb-6`}
                onChangeText={handleChange("petName")}
                onBlur={handleBlur("petName")}
                value={values.petName}
              />
              <Text style={tw`text-lg mb-2`}>
                What type of pet do you have? *
              </Text>
              <View style={tw`flex w-full flex-row justify-around mb-6`}>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue("petType", "dog");
                    setSelectedPet("dog");
                  }}
                  style={tw``}
                >
                  <Image
                    source={dogImg}
                    style={[
                      {
                        width: 130,
                        height: 130,
                      },
                      tw`border ${
                        selectedPet === "dog"
                          ? "border-green-400 border-4"
                          : "border-gray-300"
                      } mb-2`,
                    ]}
                  />
                  <Text style={tw`text-center`}>Dog</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue("petType", "cat");
                    setSelectedPet("cat");
                  }}
                >
                  <Image
                    source={catImg}
                    style={[
                      {
                        width: 130,
                        height: 130,
                      },
                      tw`border ${
                        selectedPet === "cat"
                          ? "border-green-400 border-4"
                          : "border-gray-300"
                      } mb-2`,
                    ]}
                  />
                  <Text style={tw`text-center`}>Cat</Text>
                </TouchableOpacity>
              </View>
              <Text style={tw`text-lg mt-4`}>
                How old is your pet? (optional)
              </Text>
              <View style={tw`flex-row items-center mb-6`}>
                <TextInput
                  style={tw`border border-gray-300 p-2 mt-2 flex-1`}
                  onChangeText={handleChange("petAgeYears")}
                  onBlur={handleBlur("petAgeYears")}
                  value={values.petAgeYears}
                  placeholder="Years"
                  keyboardType="numeric"
                />
                <TextInput
                  style={tw`border border-gray-300 p-2 mt-2 flex-1`}
                  onChangeText={handleChange("petAgeMonths")}
                  onBlur={handleBlur("petAgeMonths")}
                  value={values.petAgeMonths}
                  placeholder="Months"
                  keyboardType="numeric"
                />
              </View>

              <Text style={tw`text-lg mt-4`}>
                What is your pet's gender? (optional)
              </Text>
              <View style={tw`flex w-full flex-row justify-between mb-10 mt-2`}>
                <TouchableOpacity
                  onPress={() => setPetGender("female")}
                  style={[
                    tw`border-2 border-gray-300 p-2 w-1/2`,
                    petGender === "female" && tw`border-green-500`,
                  ]}
                >
                  <Text style={tw`text-center`}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setPetGender("male")}
                  style={[
                    tw`border-2 border-gray-300 p-2 w-1/2`,
                    petGender === "male" && tw`border-green-500`,
                  ]}
                >
                  <Text style={tw`text-center`}>Male</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={tw`rounded-full bg-emerald-500 py-4`}
              >
                <Text style={tw`text-center text-white text-lg font-semibold`}>
                  Create Pet Profile
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};
export default GettingStartedScreen;
