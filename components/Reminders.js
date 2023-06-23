import tw from "twrnc";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import HandImg from "../assets/images/hands.png";
import { Icon } from "@rneui/base";

const Reminders = () => {
  return (
    <View
      style={[
        tw`w-[92%] mx-auto bg-red-400 rounded-xl mb-6 border-2 border-white`,
        // {
        //   shadowColor: "rgba(235,230,230,0.46)",
        //   shadowOpacity: 1,
        //   shadowOffset: { width: -1, height: 3 },
        //   shadowRadius: 4,
        //   elevation: 5, // This property is required for Android shadow effect
        // },
      ]}
    >
      <TouchableOpacity style={tw`flex flex-row pb-2 pt-3`}>
        <View style={tw`w-[70%] pl-3`}>
          <View style={tw`flex flex-row py-2`}>
            <Icon name="pill" type="material-community" color="white" />
            <Text style={tw`text-white text-xl font-bold pb-1`}>
              {" "}
              Health Checkup
            </Text>
          </View>
          <View style={tw`flex flex-row`}>
            <Icon name="clock" type="feather" color="white" size={15} />
            <Text style={tw`text-white`}> 9:00 AM • 11 August, 2023</Text>
          </View>
        </View>
        <Image
          style={{
            width: 80,
            height: 80,
            resizeMode: "contain",
          }}
          source={HandImg}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Reminders;
const styles = StyleSheet.create({});
