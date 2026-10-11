import {
  TabList,
  TabSlot,
  TabTrigger,
  type TabTriggerSlotProps,
  Tabs,
} from "expo-router/ui";
import { Pressable, StyleSheet, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AddButton } from "./add-button";
import { ThemedText } from "./themed-text";

export default function AppTabs() {
  return (
    <Tabs style={styles.tabs}>
      <TabSlot style={styles.slot} />

      <TabList asChild>
        <TabBar>
          <TabTrigger name="index" href={"/"} asChild>
            <TabButton>账单</TabButton>
          </TabTrigger>
          <TabTrigger name="stats" href={"/stats"} asChild>
            <TabButton>统计</TabButton>
          </TabTrigger>
          <AddButton />
          <TabTrigger name="budget" href={"/budget"} asChild>
            <TabButton>预算</TabButton>
          </TabTrigger>
          <TabTrigger name="accounts" href={"/accounts"} asChild>
            <TabButton>账户</TabButton>
          </TabTrigger>
        </TabBar>
      </TabList>
    </Tabs>
  );
}

function TabBar(props: ViewProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      {...props}
      style={[styles.bar, { paddingBottom: 10 + insets.bottom }]}
    />
  );
}
function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={styles.button}>
      <ThemedText style={[styles.label, isFocused && styles.labelOn]}>
        {children}
      </ThemedText>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  tabs: { flex: 1 },
  slot: { flex: 1 },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#1d243b",
    backgroundColor: "#ffffff",
    paddingTop: 8,
  },
  button: { flex: 1, alignItems: "center", paddingVertical: 6 },
  label: { fontSize: 13, color: "#030508" },
  labelOn: { color: "#2563eb", fontWeight: "700" },
});
