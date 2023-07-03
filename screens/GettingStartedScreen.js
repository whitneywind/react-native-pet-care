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
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPet, setPets } from "../slices/petsSlice";
import { useNavigation } from "@react-navigation/native";

const GettingStartedScreen = () => {
  // TO-DO: choose icon to use in place of photo
  // TO-DO: make button unclickable until required info filled out

  const currPetData = useSelector((state) => state.pets);
  const currPet = useSelector((state) => state.pets.currentPet);

  console.log("landingscreen pet data status: ", currPetData);
  console.log("landingscreen currPet status: ", currPet);

  const dispatch = useDispatch();
  const [selectedPet, setSelectedPet] = useState("");
  const [petGender, setPetGender] = useState("");

  const navigation = useNavigation();

  const setPetData = async (values) => {
    try {
      const value = await AsyncStorage.getItem("petData");
      let petData = value ? JSON.parse(value) : [];
      petData.push({ ...values, id: petData.length });

      // await AsyncStorage.removeItem("petData");

      await AsyncStorage.setItem("petData", JSON.stringify(petData));

      // update redux store with new pet data

      // TO-DO: fix bug where after inputing first pet, the homescreen says current pet is null
      dispatch(setPets(petData));
      dispatch(setCurrentPet(petData[petData.length - 1]));

      // console.log("now this is under petData", petData);
    } catch (error) {
      console.error("error setting pet data: ", error);
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
            petGender: "",
            avatar: "",
          }}
          onSubmit={(values) => {
            setPetData(values);
            navigation.navigate("HomeScreen");
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
                required
              />
              <Text style={tw`text-lg mb-2`}>
                What type of pet do you have? *
              </Text>
              <View style={tw`flex w-full flex-row justify-around mb-6`}>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue("petType", "dog");
                    setFieldValue("avatar", "dog");
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
                    setFieldValue("avatar", "cat");
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
                  style={tw`border border-gray-300 p-2 mt-2 flex-1 text-center`}
                  onChangeText={handleChange("petAgeYears")}
                  onBlur={handleBlur("petAgeYears")}
                  value={values.petAgeYears}
                  placeholder="Years"
                  keyboardType="numeric"
                />
                <TextInput
                  style={tw`border border-gray-300 p-2 mt-2 flex-1 text-center`}
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
              <View style={tw`flex-row mb-10 mt-2`}>
                <TouchableOpacity
                  onPress={() => {
                    setPetGender("female");
                    setFieldValue("petGender", "female");
                  }}
                  style={[
                    tw`border border-gray-300 p-2 w-1/2`,
                    petGender === "female" && tw`border-green-500`,
                  ]}
                >
                  <Text style={tw`text-center`}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPetGender("male");
                    setFieldValue("petGender", "male");
                  }}
                  style={[
                    tw`border border-gray-300 p-2 w-1/2`,
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
