import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useLedger } from "@/store/ledger";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  "餐饮",
  "交通",
  "购物",
  "房租",
  "娱乐",
  "学习",
  "水电",
  "医疗",
];
const keypad = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "⌫"],
];

export default function AddScreen() {
  const router = useRouter();
  const { addItem } = useLedger();
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState("2026-10-11");
  const [category, setCategory] = useState("餐饮");
  const [isExpense, setIsExpense] = useState(true);
  const [title, setTitle] = useState("");

  function saveOnce() {
    const cents = Math.round(Number(amount) * 100);
    addItem({
      id: String(Date.now()),
      title: title || "未备注",
      amountCents: isExpense ? -cents : cents,
      category: category,
      date: date,
    });
  }
  function onSave() {
    saveOnce();
    router.back();
  }
  function onAgain() {
    saveOnce();
    setAmount("0");
  }
  function onKey(key: string) {
    if (key === "⌫") {
      const next = amount.slice(0, -1);
      setAmount(next === "" ? "0" : next);
    } else if (key === ".") {
      if (amount.includes(".")) return;
      setAmount(amount + ".");
    } else {
      setAmount(amount === "0" ? key : amount + key);
    }
  }
  function shiftDay(delta: number) {
    const d = new Date(date + "T00:00:00");
    d.setDate(d.getDate() + delta);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    setDate(`${y}-${m}-${day}`);
  }

  return (
    <ThemedView style={styles.page}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.segment}>
          <Pressable
            style={[styles.segItem, isExpense && styles.segItemOn]}
            onPress={() => setIsExpense(true)}
          >
            <ThemedText style={isExpense ? styles.segTextOn : styles.segText}>
              支出
            </ThemedText>
          </Pressable>
          <Pressable
            style={[styles.segItem, !isExpense && styles.segItemOn]}
            onPress={() => setIsExpense(false)}
          >
            <ThemedText style={!isExpense ? styles.segTextOn : styles.segText}>
              收入
            </ThemedText>
          </Pressable>
        </View>

        <ThemedText style={styles.fieldLabel}>金额</ThemedText>
        <View style={styles.amountRow}>
          <ThemedText style={styles.currency}>￥</ThemedText>
          <ThemedText style={styles.amount}>{amount}</ThemedText>
        </View>
        <View style={styles.amountLine}></View>
        <ThemedText style={styles.fieldLabel}>
          分类（默认选中第一个）
        </ThemedText>
        <View style={styles.grid}>
          {categories.map((name) => (
            <Pressable
              key={name}
              style={[styles.chip, name === category && styles.chipOn]}
              onPress={() => setCategory(name)}
            >
              <ThemedText style={styles.chipText}>{name}</ThemedText>
            </Pressable>
          ))}
        </View>
        <View style={styles.noteRow}>
          <ThemedText style={styles.noteLabel}>备注</ThemedText>
          <TextInput
            style={styles.noteInput}
            value={title}
            onChangeText={setTitle}
            placeholder="午饭 · 麻辣烫"
            placeholderTextColor="#9AA0A6"
          ></TextInput>
        </View>

        <View style={styles.noteRow}>
          <ThemedText style={styles.noteLabel}>日期</ThemedText>
          <View style={styles.dateBox}>
            <Pressable style={styles.dayBtn} onPress={() => shiftDay(-1)}>
              <ThemedText style={styles.dayBtnText}>-</ThemedText>
            </Pressable>
            <ThemedText style={styles.noteValue}>{date}</ThemedText>
            <Pressable style={styles.dayBtn} onPress={() => shiftDay(1)}>
              <ThemedText style={styles.dayBtnText}>+</ThemedText>
            </Pressable>
          </View>
        </View>

        <View style={styles.spring}>
          <View style={styles.keypad}>
            {keypad.map((row, i) => (
              <View key={i} style={styles.keypadRow}>
                {row.map((key) => (
                  <Pressable
                    key={key}
                    style={styles.key}
                    onPress={() => onKey(key)}
                  >
                    <ThemedText style={styles.keyText}>{key}</ThemedText>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.actions}>
            <Pressable style={styles.action} onPress={() => setAmount("0")}>
              <ThemedText style={styles.actionText}>清零</ThemedText>
            </Pressable>
            <Pressable style={styles.action} onPress={onAgain}>
              <ThemedText style={styles.actionTextPrimary}>再记一笔</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.action, styles.actionSave]}
              onPress={onSave}
            >
              <ThemedText style={styles.actionTextSave}>保存</ThemedText>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 16,
  },
  segment: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#f0f0f3",
    borderRadius: 10,
    padding: 4,
  },
  segItem: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  segItemOn: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  segText: { fontSize: 15, lineHeight: 20, color: "#60646C" },
  segTextOn: {
    fontSize: 15,
    lineHeight: 20,
    color: "#EF4444",
    fontWeight: 600,
  },
  fieldLabel: { fontSize: 13, lineHeight: 18, color: "#60646C" },
  amountRow: { flexDirection: "row", alignItems: "flex-end", gap: 4 },
  currency: { fontSize: 20, lineHeight: 28, color: "#111827" },
  amount: { fontSize: 34, lineHeight: 42, fontWeight: 700, color: "#111827" },
  amountLine: { height: 2, backgroundColor: "#2563EB" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    alignItems: "center",
    width: "23%",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f3",
  },
  chipOn: {
    backgroundColor: "#fde8e8",
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  chipText: { fontSize: 14, lineHeight: 20, color: "#111827" },
  noteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    padding: 12,
  },
  noteLabel: { fontSize: 13, lineHeight: 18, color: "#111827" },
  noteValue: { fontSize: 14, lineHeight: 20, color: "#9AA0A6" },
  noteInput: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    lineHeight: 20,
    color: "#111827",
    padding: 0,
  },
  keypad: { flexDirection: "column" },
  keypadRow: { flexDirection: "row" },
  key: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  keyText: { fontSize: 20, lineHeight: 26, color: "#111827" },
  spring: { flex: 1, justifyContent: "flex-end", gap: 8 },
  actions: { flexDirection: "row", gap: 8 },
  action: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D8DBE2",
    backgroundColor: "#FFFFFF",
  },
  actionText: { fontSize: 15, lineHeight: 20, color: "#111827" },
  actionTextPrimary: {
    fontSize: 15,
    lineHeight: 20,
    color: "#2563EB",
    fontWeight: "600",
  },
  actionSave: { backgroundColor: "#2563EB", borderColor: "transparent" }, //borderColor: "transparent"透明边框
  actionTextSave: {
    fontSize: 15,
    lineHeight: 20,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  dateBox: { flexDirection: "row", alignItems: "center", gap: 8 },
  dayBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D8DBE2",
  },
  dayBtnText: { fontSize: 16, lineHeight: 20, color: "#111827" },
});
