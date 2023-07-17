import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

const navData = [
  {
    id: "1",
    title: "Activity",
    icon: "paw",
    iconType: "font-awesome-5",
    screen: "ActivityScreen",
    color: "#ffb053",
  },
  {
    id: "2",
    title: "Details",
    icon: "info",
    iconType: "font-awesome-5",
    screen: "DetailsScreen",
    color: "#ffb053",
  },
  {
    id: "3",
    title: "Photos",
    icon: "camera",
    iconType: "font-awesome-5",
    screen: "DetailsScreen",
    color: "#ffb053",
  },
  {
    id: "4",
    title: "Call Vet",
    icon: "heartbeat",
    iconType: "font-awesome-5",
    screen: "DetailsScreen",
    color: "#ffb053",
  },
];
const NavOptions = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={navData}
      horizontal
      keyExtractor={(item) => item.id}
      contentContainerStyle={tw`mb-8 w-[89%] mx-auto justify-between flex`}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`w-18 flex rounded-lg`}
        >
          <View style={tw`py-3 bg-[${item.color}] flex rounded-lg`}>
            <Icon
              style={tw`p-2 rounded-full w-10 self-center text-white`}
              name={item.icon}
              color="white"
              type={item.iconType}
            />
          </View>
          <Text style={tw`text-center mt-1 font-semibold`}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};
export default NavOptions;
const styles = StyleSheet.create({});
