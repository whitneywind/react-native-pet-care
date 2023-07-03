import { Icon } from "@rneui/base";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import MaggieImg from "../assets/images/maggie.jpg";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const DetailsScreen = () => {
  const navigation = useNavigation();

  const petData = useSelector((state) => state.pets.pets);
  const currentPet = useSelector((state) => state.pets.currentPet);

  return (
    <SafeAreaView style={tw` h-full`}>
      <ScrollView style={tw`w-[89%] mx-auto`}>
        <View style={tw`flex flex-row items-center justify-between mt-2`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" type="antdesign" size={25} style={tw``} />
          </TouchableOpacity>
          <Text style={tw`text-3xl font-bold pr-2 tracking-wide`}>Details</Text>
          <Icon name="more-vertical" type="feather" size={25} style={tw``} />
        </View>
        <View style={tw`w-full mx-auto pb-3 my-3 bg-white rounded-lg`}>
          <Image
            style={[
              {
                width: 320,
                height: 230,
                resizeMode: "cover",
                borderRadius: 6,
              },
              tw`self-center m-3`,
            ]}
            source={MaggieImg}
          />
          <View style={tw`flex flex-row flex-wrap items-center px-4 gap-y-3`}>
            <Text style={tw`text-2xl p-1 w-1/2`}>{currentPet.petName}</Text>
            <Text style={tw`text-lg text-right text-gray-700 p-1 w-1/2`}>
              {currentPet.petAgeYears} year
              {parseInt(currentPet.petAgeYears) > 1 ? "s" : ""} old
            </Text>
          </View>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-2xl text-center p-1 font-bold underline`}>
            General
          </Text>
          <View style={tw`flex items-center gap-y-2`}>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Breed:</Text>
              <Text style={tw`text-lg p-1`}>Genovian Hunting</Text>
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                Weight:
              </Text>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                29 lbs
              </Text>
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Gender:</Text>
              <Text style={tw`text-lg p-1`}>female</Text>
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                Microchip:
              </Text>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                23499G79014A
              </Text>
            </View>
          </View>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-2xl text-center font-bold p-1 underline`}>
            Medical
          </Text>
          <View style={tw`flex items-center gap-y-2`}>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Last Vet Visit:</Text>
              <Text style={tw`text-lg p-1`}>3/12/2023</Text>
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                Allergies
              </Text>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>none</Text>
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Medications:</Text>
              <Text style={tw`text-lg p-1`}>none</Text>
            </View>
          </View>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg`}>
          <Text style={tw`text-2xl text-center font-bold p-1`}>
            Activity Log
          </Text>
          <TouchableOpacity>
            <View style={tw`bg-emerald-300 rounded-lg py-2 w-1/3 my-3 mx-auto`}>
              <Icon
                name="arrow-right-circle"
                type="feather"
                size={25}
                style={tw``}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DetailsScreen;
