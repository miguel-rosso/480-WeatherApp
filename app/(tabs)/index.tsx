import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const background = useThemeColor({}, 'background');
  const card = useThemeColor({}, 'card');
  const text = useThemeColor({}, 'text');
  const primary = useThemeColor({}, 'primary');
  const secondary = useThemeColor({}, 'secondary');
  const accent = useThemeColor({}, 'accent');

  return (
    <View 
      className="flex-1 items-center justify-center gap-4 px-6"
      style={{ backgroundColor: background }}
    >
      <Text className="text-3xl font-bold" style={{ color: text }}>
        ☀️ Weather App
      </Text>

      <View className="w-full p-6 rounded-2xl" style={{ backgroundColor: card }}>
        <Text className="text-sm mb-2" style={{ color: text }}>Sky Blue</Text>
        <View className="p-4 rounded-lg" style={{ backgroundColor: primary }}>
          <Text className="text-white text-center font-semibold">Primary</Text>
        </View>
      </View>

      <View className="w-full p-6 rounded-2xl" style={{ backgroundColor: card }}>
        <Text className="text-sm mb-2" style={{ color: text }}>Nature Green</Text>
        <View className="p-4 rounded-lg" style={{ backgroundColor: secondary }}>
          <Text className="text-white text-center font-semibold">Secondary</Text>
        </View>
      </View>

      <View className="w-full p-6 rounded-2xl" style={{ backgroundColor: card }}>
        <Text className="text-sm mb-2" style={{ color: text }}>Sun Yellow</Text>
        <View className="p-4 rounded-lg" style={{ backgroundColor: accent }}>
          <Text className="text-white text-center font-semibold">Accent</Text>
        </View>
      </View>

      <Text className="text-xs mt-4" style={{ color: text }}>
        🌙 Toggle dark mode to see theme changes
      </Text>
    </View>
  );
}
