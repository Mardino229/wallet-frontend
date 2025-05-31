import { styles } from "@/assets/styles/home.styles"
import { COLORS } from "@/constants/colors"
import { View, Text } from "react-native"

export interface Summary {
    income: string,
    balance: string,
    expense: string
}

export const BalanceCard = ({income, balance, expense}: Summary) => {

    return (
        <View style={styles.balanceCard}>
            <Text style={styles.balanceTitle}>Total Balance</Text>
            <Text style={styles.balanceAmount}>${parseFloat(balance).toFixed(2)}</Text>
            <View style={styles.balanceStats}>
                <View style={styles.balanceStatItem}>
                    <Text style={styles.balanceStatLabel}>Income</Text>
                    <Text style={[styles.balanceStatAmount, {color: COLORS.income}]}>
                        +${parseFloat(income).toFixed(1)}
                    </Text>
                </View>
                <View style={[styles.balanceStatItem, styles.statDivider]} />
                <View style={styles.balanceStatItem}>
                    <Text style={styles.balanceStatLabel}>Expense</Text>
                    <Text style={[styles.balanceStatAmount, {color: COLORS.expense}]}>
                        -${Math.abs(parseFloat(expense)).toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    )
}