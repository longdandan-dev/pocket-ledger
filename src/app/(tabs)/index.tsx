import { ThemedText } from "@/components/themed-text";
import { useLedger } from "@/store/ledger";
import { formatMoney } from "@/utils/money";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { items } = useLedger();
  const balance = items.reduce((sum, item) => sum + item.amountCents, 0);
  const income = items
    .filter((item) => item.amountCents > 0)
    .reduce((sum, item) => sum + item.amountCents, 0);
  const expense = items
    .filter((item) => item.amountCents < 0)
    .reduce((sum, item) => sum + item.amountCents, 0);
  return (
    <View style={styles.page}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText style={styles.month}>2026年10月 {">"} </ThemedText>
          <View style={styles.actions}>
            <View style={styles.circle}>
              <ThemedText style={styles.circleText}>🔍</ThemedText>
            </View>
            <View style={styles.circle}>
              <ThemedText style={styles.circleText}>龙</ThemedText>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <ThemedText style={styles.cardLabel}>本月结余</ThemedText>
          <ThemedText style={styles.balance}>
            ￥{formatMoney(balance)}
          </ThemedText>

          <View style={styles.row}>
            <View style={styles.cell}>
              <ThemedText style={styles.cellLabel}>收入</ThemedText>
              <ThemedText style={styles.cellValue}>
                ￥{formatMoney(income)}
              </ThemedText>
            </View>
            <View style={styles.cell}>
              <ThemedText style={styles.cellLabel}>支出</ThemedText>
              <ThemedText style={styles.cellValue}>
                ￥{formatMoney(expense)}
              </ThemedText>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>本月流水</ThemedText>
          {items.map((item) => (
            <View key={item.id} style={styles.listRow}>
              <ThemedText style={styles.rowTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.rowAmount}>
                {item.amountCents < 0 ? "-" : "+"}
                {formatMoney(item.amountCents)}
              </ThemedText>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  cardLabel: { fontSize: 13, lineHeight: 18, color: "#60646C" },
  balance: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 44,
  },
  row: { flexDirection: "row", gap: 12 },
  cell: { flex: 1, gap: 4 },
  cellLabel: { fontSize: 12, lineHeight: 16, color: "#60646C" },
  cellValue: { fontSize: 16, fontWeight: "600", color: "#111827" },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 14, lineHeight: 20, color: "#60646C" },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowTitle: { fontSize: 16, lineHeight: 22, color: "#111827" },
  rowAmount: { fontSize: 16, lineHeight: 22, color: "#111827" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  actions: { flexDirection: "row", gap: 10 },
  circle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d4d7dd",
  },
  circleText: { fontSize: 24, lineHeight: 30, color: "#FFFFFF" },
  month: { fontSize: 18, lineHeight: 20, fontWeight: 700 },
});
