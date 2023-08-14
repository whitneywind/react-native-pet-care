import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Corgo from "../assets/images/corgo.png";
import { Icon } from "@rneui/base";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPet, setPets } from "../slices/petsSlice";

const LandingScreen = () => {
  const [dataExists, setDataExists] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    clearReduxState();
    getPetData();
    console.log("dataExists: ", dataExists);
  }, []);

  const clearReduxState = () => {
    // Dispatch actions to clear the Redux state
    dispatch(setPets(null)); // Set pets to null
    dispatch(setCurrentPet(null)); // Set currentPet to null
  };

  const getPetData = async () => {
    try {
      const data = await AsyncStorage.getItem("petData");
      // await AsyncStorage.removeItem("petData");
      if (data !== null) {
        console.log("existing petData: ", data);

        const parsedPetData = JSON.parse(data).filter((item) => item !== null);

        setDataExists(true);

        console.log("parsedPetData on landing", parsedPetData.length);

        // set redux store with data from storage (if exists)
        dispatch(setPets(parsedPetData));
        dispatch(setCurrentPet(parsedPetData[0]));
      } else {
        console.log("no data saved locally");
      }
    } catch (e) {
      console.log("error fetching pet data in landingScreen: ", e);
    }
  };

  const currentPet = useSelector((state) => state.pets.currentPet);
  console.log("curr pet on landing page", currentPet);

  const currentPets = useSelector((state) => state.pets.pets);
  console.log("all peets in state on landing");
  console.log(JSON.stringify(currentPets, null, 2));

  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`h-full`}>
      <View style={tw`pt-1 mb-16 w-full`}>
        <Icon name="dog" type="material-community" size={40} />
        <Text style={tw`text-center text-xl`}>Pet Place</Text>
      </View>
      <View>
        <Image
          source={Corgo}
          resizeMode="contain"
          style={{
            width: "100%",
            height: 300,
            resizeMode: "contain",
          }}
        />
        <Text style={tw`text-center text-3xl mx-8 mt-2 leading-normal`}>
          Helping you care for your pet one day at a time
        </Text>
        <Text
          style={tw`text-center text-lg mx-8 tracking-wide mt-3 text-gray-600`}
        >
          All pets deserve care and love
        </Text>
        <TouchableOpacity
          style={tw`rounded-lg w-3/5 mx-auto rounded-full bg-emerald-500 py-3 mt-12`}
          onPress={() =>
            navigation.navigate(
              dataExists ? "HomeScreen" : "GettingStartedScreen"
            )
          }
        >
          <Text style={tw`text-center text-2xl text-white font-bold`}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default LandingScreen;
