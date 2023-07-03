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
import LongDog from "../assets/images/longdog.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ActivityScreen = () => {
  const navigation = useNavigation();

  const petData = useSelector((state) => state.pets.pets);
  const currentPet = useSelector((state) => state.pets.currentPet);

  const customResizeMode = (width, height) => {
    return "cover";
  };

  return (
    <SafeAreaView style={tw` h-full`}>
      <ScrollView style={tw`w-[89%] mx-auto`}>
        <View style={tw`flex flex-row items-center justify-between mt-2 mb-5`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" type="antdesign" size={25} style={tw``} />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-bold pr-2`}>
            {currentPet.petName}'s Activity
          </Text>
          <Icon name="more-vertical" type="feather" size={25} style={tw``} />
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <View style={tw`flex items-center gap-y-2`}>
            <Image
              source={LongDog}
              style={{
                width: 230,
                height: 100,
                resizeMode: "cover",
              }}
            />
            <Text style={tw`text-2xl text-center p-1 font-bold underline`}>
              Exercise
            </Text>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Daily Walk Goal:</Text>
              <Text style={tw`text-lg p-1`}>30 min</Text>
            </View>

            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Walking Streak:</Text>
              <Text style={tw`text-lg p-1`}>5 days</Text>
            </View>
            <View
              style={tw`flex-row justify-between w-5/6 bg-violet-300 rounded-lg py-2`}
            >
              <Text
                style={tw`text-lg font-bold text-white text-right w-full text-center text-gray-700 p-1`}
              >
                Add New Walk
              </Text>
            </View>
          </View>
        </View>

        <View
          style={tw`w-full mx-auto pb-3 bg-violet-200 h-1/3 rounded-lg mb-5`}
        >
          <Text>chart</Text>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-xl text-center p-1 font-bold underline`}>
            Obedience Training
          </Text>
          <Text style={tw`text-center text-lg`}>Coming soon!</Text>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg`}>
          <Text style={tw`text-xl text-center font-bold p-1 mt-1`}>
            Back to Homepage
          </Text>
          <TouchableOpacity>
            <View style={tw`bg-violet-300 rounded-lg py-2 w-1/3 mt-1 mx-auto`}>
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
export default ActivityScreen;
