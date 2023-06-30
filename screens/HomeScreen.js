import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "../components/NavOptions";
import Reminders from "../components/Reminders";
import PetsList from "../components/PetsList";
import tw from "twrnc";
import { useSelector } from "react-redux";
import germanShepImg from "../assets/images/germanshepherd.png";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  // if no curr pet bc pet data empty create blank page with just add pet option (to starting page) with conditional rendering

  // render pets below with data from state/storage
  // we also need the ability to change the current pet in this component

  // link to pages below should reflect current pet - dynamic pages needed? or just one pagee where the info reflects current pet

  const petData = useSelector((state) => state.pets);
  const currentPet = useSelector((state) => state.pets.currentPet);

  // console.log("current pet: ", currentPet);
  // console.log("petdata in the state: ", petData);

  const navigation = useNavigation();

  if (!petData) {
    return (
      <SafeAreaView>
        <View>
          <Text>No pet data! Add a new pet to continue</Text>
          <TouchableOpacity
            style={tw`mx-10 mt-12`}
            onPress={() => navigation.navigate("GettingStartedScreen")}
          >
            <Icon name="pluscircle" type="antdesign" size={70} color="white" />
            <Text style={tw`text-white text-lg pt-4`}>Add New Pet</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
              {/* current pet's name */}
              <Text style={tw`font-bold text-black`}>
                {" "}
                {currentPet.petName}{" "}
              </Text>
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
