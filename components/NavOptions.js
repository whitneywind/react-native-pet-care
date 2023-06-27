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
    screen: "LandingScreen",
    color: "bg-violet-500",
  },
  {
    id: "2",
    title: "Details",
    icon: "info",
    iconType: "font-awesome-5",
    screen: "DetailsScreen",
    color: "bg-red-400",
  },
  {
    id: "3",
    title: "Call Vet",
    icon: "heartbeat",
    iconType: "font-awesome-5",
    screen: "DetailsScreen",
    color: "bg-emerald-500",
  },
];
const NavOptions = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={navData}
      horizontal
      keyExtractor={(item) => item.id}
      style={tw`pl-2 mb-6`}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`py-3 ${item.color} m-2 w-27 flex rounded-lg`}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View>
            <Icon
              style={tw`p-2 rounded-full w-10 self-center text-white`}
              name={item.icon}
              color="white"
              type={item.iconType}
            />
            <Text style={tw`text-xl font-semibold text-white text-center`}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
export default NavOptions;
const styles = StyleSheet.create({});
