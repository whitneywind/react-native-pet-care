import tw from "twrnc";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";

const Reminders = () => {
  const handlePress = () => {
    navigation.navigate("LandingScreen");
  };
  return (
    <View
      style={[
        tw`w-[89%] mx-auto bg-violet-500 rounded-xl mb-6 border-2 border-white`,
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        style={tw`flex flex-row justify-between items-center pl-3 pr-6 py-4`}
      >
        <View style={tw`w-[70%]`}>
          <View style={tw`flex flex-row`}>
            <Icon name="pill" type="material-community" color="white" />
            <Text style={tw`text-white text-xl font-bold pb-1`}>
              {" "}
              Yearly Checkup
            </Text>
          </View>
          <View style={tw`flex flex-row`}>
            <Icon name="clock" type="feather" color="white" size={15} />
            <Text style={tw`text-white`}> 9:00 AM • 11 August, 2023</Text>
          </View>
        </View>
        <Icon name="calendar" type="antdesign" color="white" size={45} />
      </TouchableOpacity>
    </View>
  );
};
export default Reminders;
const styles = StyleSheet.create({});
