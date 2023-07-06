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
} from "react-native";
import tw from "twrnc";
import LongDog from "../assets/images/longdog.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import WalkChart from "../components/WalkChart";
import { useState } from "react";
import { Formik } from "formik";

const ActivityScreen = () => {
  const navigation = useNavigation();

  const petData = useSelector((state) => state.pets.pets);
  const currentPet = useSelector((state) => state.pets.currentPet);

  const [walkModalOpen, setWalkModalOpen] = useState(false);

  // const customResizeMode = (width, height) => {
  //   return "cover";
  // };

  // const handleSubmit = () => {
  //   console.log("handle submit fn");
  // };

  return (
    <SafeAreaView style={tw` h-full`}>
      <ScrollView style={tw`w-[89%] mx-auto`}>
        <View style={tw`flex flex-row items-center justify-between mt-2 mb-5`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" type="antdesign" size={25} style={tw``} />
          </TouchableOpacity>
          <Text style={tw`text-xl font-semibold pr-2`}>
            {currentPet.petName}'s Activity
          </Text>
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
              Exercise
            </Text>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Daily Walk Goal:</Text>
              <Text style={tw`text-lg p-1`}>30 min</Text>
            </View>

            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Walking Streak:</Text>
              <Text style={tw`text-lg p-1`}>5 days</Text>
            </View>
            <TouchableOpacity
              onPress={() => setWalkModalOpen(!walkModalOpen)}
              style={tw`flex-row justify-between w-5/6 bg-violet-400 rounded-lg py-2`}
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
          <View style={tw`flex justify-center items-center mt-40`}>
            <View
              style={tw`bg-white border-2 border-violet-200 rounded-lg w-2/3 p-10 items-center shadow-lg elevation-5`}
            >
              <Text style={tw`text-center text-2xl`}>New Walk</Text>
              <Formik
                initialValues={{
                  walkDate: "",
                  walkLength: "0",
                }}
                onSubmit={(values) => {
                  console.log("on submit in fn: ", values);
                  setWalkModalOpen(!walkModalOpen);
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                    <Text style={tw`text-lg mt-4`}>Walk Date</Text>
                    <TextInput
                      style={tw`border border-gray-300 p-2 mt-2 mb-6`}
                      onChangeText={handleChange("walkDate")}
                      onBlur={handleBlur("walkDate")}
                      value={values.walkDate}
                      required
                    />
                    <Text style={tw`text-lg mt-4`}>Walk Length in Minutes</Text>
                    <View style={tw`flex-row items-center mb-6`}>
                      <TextInput
                        style={tw`border border-gray-300 p-2 mt-2 flex-1 text-center`}
                        onChangeText={handleChange("walkLength")}
                        onBlur={handleBlur("walkLength")}
                        value={values.walkLength}
                        placeholder="20"
                        keyboardType="numeric"
                      />
                    </View>
                    <TouchableOpacity
                      style={tw`rounded-xl bg-violet-400 px-3 py-2`}
                      onPress={handleSubmit}
                    >
                      <Text
                        style={tw`text-white font-bold text-center text-lg`}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </Modal>

        <View style={tw`w-full mx-auto bg-white rounded-lg mb-5`}>
          <WalkChart />
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg`}>
          <Text style={tw`text-xl text-center font-bold p-1 mt-1`}>
            Back to Homepage
          </Text>
          <TouchableOpacity>
            <View style={tw`bg-violet-300 rounded-lg py-2 w-1/3 mt-1 mx-auto`}>
              <Icon
                name="arrow-right-circle"
                type="feather"
                size={25}
                style={tw``}
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
