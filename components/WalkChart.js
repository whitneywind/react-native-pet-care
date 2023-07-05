import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import tw from "twrnc";

const WalkChart = () => {
  return (
    <View style={tw`bg-violet-200 rounded-lg`}>
      <LineChart
        data={{
          labels: ["M", "T", "W", "Th", "F", "S", "Su"],
          datasets: [
            {
              data: [
                Math.floor(Math.random() * 100) + 1,
                Math.floor(Math.random() * 100) + 1,
                Math.floor(Math.random() * 100) + 1,
                Math.floor(Math.random() * 100) + 1,
                Math.floor(Math.random() * 100) + 1,
                Math.floor(Math.random() * 100) + 1,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={250}
        yAxisSuffix="m"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          //   backgroundColor: "#C084FC",
          backgroundGradientFrom: "#7c3aed",
          backgroundGradientTo: "#c4b5fd",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            // borderRadius: 16,
            yAxisLabel: { width: 10 },
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#5b21b6",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          //   borderRadius: 16,
          marginLeft: -16,
        }}
      />
    </View>
  );
};
export default WalkChart;
const styles = StyleSheet.create({});
