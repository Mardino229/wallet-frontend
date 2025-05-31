import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";
import { formatDate } from "@/lib/util";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";

const CATEGORY_ICONS: Record<Transaction["category"], keyof typeof Ionicons.glyphMap> = {
    "Food & Drinks": "fast-food", 
    Shopping: "cart",
    Transportation: "car",
    Entertainment: "film",
    Bills: "receipt",
    Income: "cash",
    Other: "ellipsis-horizontal",
};
 
export interface Transaction {
    amount: string;
    category: "Food & Drinks"|"Shopping" | "Transportation" | "Entertainment" | "Bills" | "Income" | "Other";
    created_at: string;
    id: number;
    title: string;
    user_id: string;
}

interface TransactionItemProps {
    item: Transaction;
    onDelete: (id: number) => void;
}

export const TransactionItem = ({ item, onDelete }: TransactionItemProps) => {
    const isIncome = parseFloat(item.amount) > 0;
    const iconName = CATEGORY_ICONS[item.category] || "pricetag-outline";

    return (
        <View style={styles.transactionCard} key={item.id}>
            <TouchableOpacity style={styles.transactionContent}>
                <View style={styles.categoryIconContainer}>
                    <Ionicons name={iconName} size={22} color={isIncome ? COLORS.income : COLORS.expense} />
                </View>
                <View style={styles.transactionLeft}>
                    <Text style={styles.transactionTitle}>{item.title}</Text>
                    <Text style={styles.transactionCategory}>{item.category}</Text>
                </View>
                <View style={styles.transactionRight}>
                    <Text style={[styles.transactionAmount, { color: isIncome ? COLORS.income : COLORS.expense }]}>
                        {isIncome ? "+" : "-"}${Math.abs(parseFloat(item.amount)).toFixed(2)}
                    </Text>
                    <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
            </TouchableOpacity>
        </View>
    );
};
