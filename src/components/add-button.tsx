import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

export function AddButton() {
  const router = useRouter();
  return (
    <Pressable style={styles.button} onPress={() => router.push("/add")}>
      <ThemedText style={styles.plus}>+</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: -28,
    width: 60,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#b8becc",
    alignItems: "center",
    justifyContent: "center",
  },
  plus: { color: "#ffffff", fontSize: 28, lineHeight: 34 },
});
