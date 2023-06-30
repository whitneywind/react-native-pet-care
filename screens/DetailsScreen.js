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
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-violet-50 h-full`}>
      <ScrollView style={tw`w-[89%] mx-auto`}>
        <View style={tw`flex flex-row items-center justify-between mt-2`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" type="antdesign" size={25} style={tw``} />
          </TouchableOpacity>
          <Text style={tw`text-3xl pr-2 tracking-wide`}>Pet Details</Text>
          <Icon name="more-vertical" type="feather" size={25} style={tw``} />
        </View>
        <View style={tw`w-full mx-auto pb-3 my-5 bg-white rounded-lg`}>
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
            <Text style={tw`text-2xl p-1 w-1/2`}>Maggie</Text>
            <Text style={tw`text-lg text-right text-gray-700 p-1 w-1/2`}>
              3 years 2 months
            </Text>
            <Text style={tw`text-lg p-1 w-2/3`}>Genovian Hunting Dog</Text>
            <Text style={tw`text-lg text-right text-gray-700 p-1 w-1/3`}>
              29 lbs
            </Text>
          </View>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-2xl text-center p-1 font-bold`}>General</Text>
          <View style={tw`flex items-center`}>
            <View style={tw`bg-violet-300 rounded-lg py-1 px-2 mx-auto`}>
              <Icon name="female" type="ionicon" size={25} style={tw``} />
            </View>
            <Text style={tw`text-lg p-1 text-center`}>Microchip Info</Text>
            <Text style={tw`text-lg p-1 text-center`}>Registration #</Text>
            <Text style={tw`text-lg p-1 text-center`}>
              Genovian Hunting Dog
            </Text>
          </View>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-2xl text-center font-bold p-1`}>Medical</Text>
          <View style={tw`flex`}>
            <Text style={tw`text-lg p-1 text-center`}>
              Last Vet Visit: 4/12/2023
            </Text>
            <Text style={tw`text-lg p-1 text-center`}>Vaccinations</Text>
            <Text style={tw`text-lg p-1 text-center`}>Medications</Text>
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
