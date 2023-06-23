import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "../components/NavOptions";
import Reminders from "../components/Reminders";
import tw from "twrnc";
import DogImg from "../assets/images/dog.png";
import CatImg from "../assets/images/cat.png";
import { Icon } from "@rneui/base";

const petData = [
  {
    id: 1,
    name: "Maggie",
    species: "dog",
    age: "3 Years",
    gender: "female",
    image: DogImg,
  },
  {
    id: 2,
    name: "Peaches",
    species: "cat",
    age: "12 Years",
    gender: "female",
    image: CatImg,
  },
  {
    id: 3,
    name: "Noodle",
    species: "dog",
    age: "2 Years",
    gender: "male",
    image: DogImg,
  },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-violet-400 h-full`}>
      <View style={tw`pt-1 mb-8 w-full`}>
        <Icon name="dog" type="material-community" color="white" size={40} />
      </View>
      <View style={tw`flex flex-row w-full justify-between px-4 mb-6`}>
        <Text style={tw`text-3xl w-[75%] leading-10 text-white`}>
          How is <Text style={tw`font-bold`}>Maggie</Text> doing today?
        </Text>
        <TouchableOpacity style={tw`bg-white rounded-full p-1`}>
          <Image
            style={{ width: 80, height: 80, resizeMode: "contain" }}
            source={DogImg}
          />
        </TouchableOpacity>
      </View>
      <View>
        <NavOptions />
      </View>
      <View>
        <Reminders />
      </View>
      <View style={tw`px-4`}>
        <View style={tw`w-full flex flex-row justify-between pt-1`}>
          <Text style={tw`text-white text-3xl`}>My Pets</Text>
          <Icon name="pluscircle" type="antdesign" size={35} color="white" />
        </View>
        <FlatList
          data={petData}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={tw`p-5 mr-4 mt-6 rounded-md bg-white`}>
                <Image
                  style={{ width: 120, height: 120, resizeMode: "contain" }}
                  source={item.image}
                />
                <Text style={tw`text-3xl`}>{item.name}</Text>
                <Text>{item.age}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({});
