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
    <SafeAreaView style={tw`h-full`}>
      <ScrollView style={tw`w-[89%] mx-auto`}>
        <View style={tw`flex flex-row items-center justify-between mt-2`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" type="antdesign" size={25} />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-bold pr-2 tracking-wide`}>Details</Text>
          <Icon name="more-vertical" type="feather" size={25} />
        </View>
        <View style={tw`w-full mx-auto pb-3 mt-3 mb-2 rounded-lg`}>
          <View style={tw`w-1/2 rounded-lg mx-auto`}>
            <Image
              style={[
                {
                  width: 180,
                  height: 170,
                  resizeMode: "cover",
                  borderRadius: 6,
                },
                tw`self-center m-2`,
              ]}
              source={MaggieImg}
            />
          </View>

          <View
            style={tw`flex items-center bg-white rounded-lg mt-3 px-4 border-b border-t border-emerald-200`}
          >
            <Text style={tw`text-3xl p-2 tracking-wide font-bold`}>
              {currentPet.petName}
            </Text>
          </View>
        </View>

        <View
          style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5 border-b border-t border-emerald-200`}
        >
          <Text style={tw`text-2xl text-center p-1 pt-2 font-bold underline`}>
            General
          </Text>
          <View style={tw`flex items-center gap-y-2`}>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Age:</Text>
              <Text style={tw`text-lg text-right text-gray-700 p-1 w-1/2`}>
                {currentPet.petAgeYears} year
                {parseInt(currentPet.petAgeYears) > 1 ? "s" : ""} old
              </Text>
            </View>

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

        <View
          style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5 border-b border-t border-emerald-200`}
        >
          <Text style={tw`text-2xl text-center font-bold p-1 pt-2 underline`}>
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

        <View
          style={tw`w-full mx-auto pb-3 bg-white rounded-lg border-b border-t border-emerald-200`}
        >
          <Text style={tw`text-2xl text-center font-bold p-1`}>
            Activity Log
          </Text>
          <TouchableOpacity>
            <View style={tw`bg-emerald-300 rounded-lg py-2 w-1/3 my-2 mx-auto`}>
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
