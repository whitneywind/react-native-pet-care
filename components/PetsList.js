import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
// import { petData } from "../assets/petData";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import dogImg from "../assets/images/germanshepherd.png";
import catImg from "../assets/images/fluffycat.png";
import { setCurrentPet } from "../slices/petsSlice";

const PetsList = () => {
  const navigation = useNavigation();
  const petData = useSelector((state) => state.pets.pets);
  const currPet = useSelector((state) => state.pets.currentPet);

  // console.log(JSON.stringify(petData, null, 2));

  // error when clicking on a pet in the pet list - seems like it's mostly the third one?
  // pets are ending up with the same key (and thus id?)
  // are they not being deleted correctly?
  // could be a zombie child / stale props issue with redux

  // on homescreen curr pet is coming up as undefined
  // double check setting curr pet correctly in landingscreen and gettingstartedscreen - check entire reducer

  const dispatch = useDispatch();

  const handleSwitchPet = (id) => {
    console.log("id we are using", id);
    if (currPet && currPet.id != id) {
      const newPetIndex = petData.findIndex((pet) => pet.id == id);
      console.log(
        "data we are looking to pick the curr from: ",
        JSON.stringify(petData, null, 2)
      );
      console.log(newPetIndex);
      console.log("trying to switch: ", petData[newPetIndex]);
      dispatch(setCurrentPet(petData[newPetIndex]));
    }
  };

  return (
    <View style={tw`px-6`}>
      <View style={tw`w-full flex flex-row justify-between pt-1`}>
        <Text style={tw`font-semibold text-2xl mb-4`}>My Pets</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("GettingStartedScreen")}
        >
          <Icon name="pluscircle" type="antdesign" size={35} color="#9BB0A5" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={petData}
        horizontal
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`rounded-lg`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`mr-5 bg-slate-100`}
            onPress={() => handleSwitchPet(item.id)}
          >
            <View style={tw`px-2 bg-white w-40 rounded-lg shadow-sm`}>
              <Image
                style={[
                  {
                    width: 130,
                    height: 100,
                    resizeMode: "contain",
                    borderRadius: 6,
                  },
                  tw`self-center mt-3`,
                ]}
                source={
                  item.uri
                    ? { uri: item.uri }
                    : item.avatar === "dog"
                    ? dogImg
                    : catImg
                }
              />
              <Text style={tw`text-xl text-center pb-3 pt-2`}>
                {item.petName}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={tw`mt-8`}
            onPress={() => navigation.navigate("GettingStartedScreen")}
          >
            <Icon
              name="pluscircle"
              type="antdesign"
              size={50}
              color="#9BB0A5"
            />
            <Text style={tw`text-slate-700 text-xl mt-2`}>Add New Pet</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default PetsList;
