import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "../components/NavOptions";
import Reminders from "../components/Reminders";
import PetsList from "../components/PetsList";
import tw from "twrnc";

import germanShepImg from "../assets/images/germanshepherd.png";
import { Icon } from "@rneui/base";

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`h-full`}>
      <ScrollView>
        <View style={tw`pt-1 mb-5 w-full`}>
          <Icon name="dog" type="material-community" size={40} />
        </View>
        <View
          style={tw`flex flex-row w-full items-center justify-around px-4 mb-10`}
        >
          <View style={tw`w-[60%]`}>
            <Text style={tw`text-3xl pb-4`}>Welcome back</Text>
            <Text style={tw`text-xl text-gray-500`}>
              How is
              <Text style={tw`font-bold text-black`}> Maggie </Text>
              today?
            </Text>
          </View>
          <TouchableOpacity style={tw`bg-emerald-500 rounded-full p-1`}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
                borderRadius: 40,
              }}
              source={germanShepImg}
            />
          </TouchableOpacity>
        </View>
        <View>
          <NavOptions />
        </View>
        <View>
          <Reminders />
        </View>
        <PetsList />
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
