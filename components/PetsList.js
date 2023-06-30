import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { petData } from "../assets/petData";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const PetsList = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`px-6`}>
      <View style={tw`w-full flex flex-row justify-between pt-1`}>
        <Text style={tw`font-semibold text-3xl mb-4`}>My Pets</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("GettingStartedScreen")}
        >
          <Icon
            name="pluscircle"
            type="antdesign"
            size={35}
            color="rgb(107, 114, 128)"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={petData}
        horizontal
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`rounded-lg p-3`}
        renderItem={({ item }) => (
          <TouchableOpacity style={tw`mr-5 bg-slate-100`}>
            <View
              style={tw`pt-4 px-3 bg-white rounded-lg shadow-lg elevation-4 border border-white border-2`}
            >
              <Image
                style={[
                  {
                    width: 130,
                    height: 130,
                    resizeMode: "contain",
                    borderRadius: 6,
                  },
                  tw`self-center`,
                ]}
                source={item.image}
              />
              <Text style={tw`text-2xl pt-2 text-center`}>{item.name}</Text>
              <Text style={tw`text-gray-400 text-center pb-2 px-8`}>
                {item.age}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={tw`mx-10 mt-12`}
            onPress={() => navigation.navigate("GettingStartedScreen")}
          >
            <Icon name="pluscircle" type="antdesign" size={70} color="white" />
            <Text style={tw`text-white text-lg pt-4`}>Add New Pet</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default PetsList;
