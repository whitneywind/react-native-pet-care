import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "../components/NavOptions";
import Reminders from "../components/Reminders";
import PetsList from "../components/PetsList";
import tw from "twrnc";
import { useSelector } from "react-redux";
import germanShepImg from "../assets/images/germanshepherd.png";
import MaggieImg from "../assets/images/maggie.jpg";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  // TO-DO: add center component to push pets list lower

  // render pets below with data from state/storage
  // we also need the ability to change the current pet in this component

  // link to pages below should reflect current pet - dynamic pages needed? or just one page where the info reflects current pet

  const petData = useSelector((state) => state.pets.pets);
  const currentPet = useSelector((state) => state.pets.currentPet);

  console.log("curr pet as of home: ", currentPet);
  const navigation = useNavigation();

  if (!petData) {
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
              <Text style={tw`font-bold text-black`}>
                {" "}
                {currentPet.petName}{" "}
              </Text>
              today?
            </Text>
          </View>
          <TouchableOpacity style={tw``}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
                borderRadius: 50,
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
        <PetsList />
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
