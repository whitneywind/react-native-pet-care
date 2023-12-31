import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "../components/NavOptions";
import Reminders from "../components/Reminders";
import PetsList from "../components/PetsList";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { setCurrentPet } from "../slices/petsSlice";
import dogImg from "../assets/images/germanshepherd.png";
import catImg from "../assets/images/fluffycat.png";

const HomeScreen = () => {
  const petData = useSelector((state) => state.pets.pets);

  // const dispatch = useDispatch();

  // dispatch(setCurrentPet(petData[petData.length - 1]));

  const currentPet = useSelector((state) => state.pets.currentPet);
  const currOrNone =
    currentPet !== undefined ? currentPet : "on home page no pet apparently";

  // console.log("currentPet: ", currOrNone);

  // console.log(
  //   "curr data as of home: ",
  //   useSelector((state) => state.pets)
  // );

  const navigation = useNavigation();

  if (!petData || !currentPet) {
    return (
      <SafeAreaView>
        <View style={tw`mx-auto w-1/2`}>
          <View style={tw`pt-1 mb-5 w-full`}>
            <Icon name="dog" type="material-community" size={40} />
          </View>
          <Text style={tw`text-4xl text-center mt-16`}>Add a pet now</Text>
          <TouchableOpacity
            style={tw`mt-8`}
            onPress={() => navigation.navigate("GettingStartedScreen")}
          >
            <Icon name="pluscircle" type="antdesign" size={70} color="gray" />
            <Text style={tw`text-white text-lg pt-4`}>Add New Pet</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`h-full`}>
      <View style={tw`pt-1 mb-3 w-full`}>
        <Icon name="dog" type="material-community" size={40} color={"black"} />
      </View>
      <View
        style={tw`flex flex-row w-full items-center justify-around px-4 mb-3`}
      >
        <View style={tw`w-[60%]`}>
          <Text style={tw`text-3xl pb-4`}>Welcome back</Text>
          <Text style={tw`text-xl text-gray-500`}>
            How is
            <Text style={tw`font-bold text-black`}>
              {" "}
              {currentPet ? currentPet.petName : "your pet"}{" "}
            </Text>
            today?
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("DetailsScreen")}>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
              borderRadius: 50,
            }}
            source={
              currentPet && currentPet.uri
                ? { uri: currentPet.uri }
                : currentPet.petType === "dog"
                ? dogImg
                : catImg
            }
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
      <TouchableOpacity
        style={tw`bg-[#10B981] w-[89%] mx-auto rounded-xl py-2`}
        onPress={() => navigation.navigate("GettingStartedScreen")}
      >
        <Text style={tw`text-white text-lg text-center font-semibold`}>
          Add Pet
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default HomeScreen;
