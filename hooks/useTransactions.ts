import { Summary } from "@/components/BalanceCard";
import { Transaction } from "@/components/TransactionItems";
import { API_URL } from "@/constants/api";
import {useCallback, useState} from "react";
import {Alert} from "react-native";


export const useTransactions = (userId: string|undefined) => {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<Summary>({
        balance: "0",
        income: "0",
        expense: "0",
    });
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            })
            const data = await response.json();
            setTransactions(data.transactions);
        } catch (e) {
            console.error("Error getting transactions:",e);
        }
    }, [userId]);

    const fetchSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`, {headers: {
                "Content-Type": "application/json",
            },})
            const data = await response.json();
            setSummary(data);
        } catch (e) {
            console.error("Error fetching summary:",e);
        }
    }, [userId]);

    const loadData = useCallback(async () => {
        if (!userId) return;

        setIsLoading(true);
        try {
            await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userId]);

    const deleTransaction = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, {method: "DELETE"});
            if (!response.ok) throw new Error("Could not delete transaction");

            loadData();
        } catch (err) {
            const error = err as Error;
            console.error(error);
            Alert.alert("Error: ", error.message);
        }
    }

    return {transactions, summary, isLoading, loadData, deleTransaction}

}