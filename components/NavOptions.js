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
    title: "Exercise",
    icon: "paw",
    iconType: "font-awesome-5",
    screen: "HealthScreen",
  },
  {
    id: "2",
    title: "Nutrition",
    icon: "drumstick-bite",
    iconType: "font-awesome-5",
    screen: "HealthScreen",
  },
  {
    id: "3",
    title: "Vet",
    icon: "heartbeat",
    iconType: "font-awesome-5",
    screen: "HealthScreen",
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
          style={tw`py-4 bg-white m-2 w-27 flex rounded-lg`}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View>
            <Icon
              style={tw`p-2 bg-violet-500 rounded-full w-10 self-center`}
              name={item.icon}
              color="white"
              type={item.iconType}
            />
            <Text style={tw`mt-2 text-xl font-semibold text-center`}>
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
