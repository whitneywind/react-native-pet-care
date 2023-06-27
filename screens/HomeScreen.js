import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "../components/NavOptions";
import Reminders from "../components/Reminders";
import tw from "twrnc";

import MaggieImg from "../assets/images/maggie.jpg";
import { Icon } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { petData } from "../assets/petData";

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <ScrollView>
        <View style={tw`pt-1 mb-5 w-full`}>
          <Icon name="dog" type="material-community" size={40} />
        </View>
        <View style={tw`flex flex-row w-full justify-between px-4 mb-6`}>
          <Text style={tw`text-3xl w-[75%] leading-10`}>
            How is
            <Text style={tw`font-bold`}> Maggie </Text>
            doing today?
          </Text>
          <TouchableOpacity style={tw`bg-violet-500 rounded-full p-1`}>
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
                borderRadius: 40,
              }}
              source={MaggieImg}
            />
          </TouchableOpacity>
        </View>
        <View>
          <NavOptions />
        </View>
        <View>
          <Reminders />
        </View>
        <View style={tw`px-6`}>
          <View style={tw`w-full flex flex-row justify-between pt-1`}>
            <Text style={tw`font-semibold text-3xl`}>My Pets</Text>
            <Icon
              name="pluscircle"
              type="antdesign"
              size={35}
              color="rgb(248 113 113)"
            />
          </View>
          <FlatList
            data={petData}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View
                  style={tw`mr-4 mt-6 ml-1 mb-2 rounded-md bg-white shadow-md elevation-4 border border-white p-2 border-2`}
                >
                  <LinearGradient
                    colors={[
                      item.species === "cat" ? "#D6BCFA" : "#EDCCDB",
                      "rgba(255, 255, 255, 1)",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    locations={[0, 0.65]}
                    style={{
                      borderRadius: 6,
                      overflow: "hidden",
                      paddingTop: 10,
                    }}
                  >
                    <Image
                      style={[
                        {
                          width: 131,
                          height: 111,
                          resizeMode: "contain",
                        },
                        tw`self-center`,
                      ]}
                      source={item.avatar}
                    />
                    <Text style={tw`text-3xl py-3 text-center`}>
                      {item.name}
                    </Text>
                    <Text style={tw`text-gray-400 text-center pb-2 px-8`}>
                      {item.age}
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({});
