
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {Text, View, Image, TouchableOpacity, FlatList, Alert, RefreshControl} from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import {useTransactions} from "@/hooks/useTransactions";
import {useEffect, useState} from "react";
import slugify from "slugify";
import PageLoader from "@/components/PageLoader";
import {styles} from "@/assets/styles/home.styles";
import {Ionicons} from "@expo/vector-icons";
import { BalanceCard } from '@/components/BalanceCard';
import { Transaction, TransactionItem } from '@/components/TransactionItems';
import NoTransactionFound from '@/components/NoTransactionFound';


export default function Page() {
    const { user } = useUser();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const id = user?.id;
    const {transactions, summary, isLoading, loadData, deleTransaction} = useTransactions(id);
    const handleDelete = (id: number)=>{
        Alert.alert("Delete Transaction", "Are you sure you want to delere this transaction ? ",
            [
                {text: "Cancel", style: "cancel"},
                {text: "Delete", style: "destructive", onPress: ()=>deleTransaction(id)},
            ]
        )
    }
    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false)
    }
    useEffect(() => {
        loadData()
    }, [loadData]);
    console.log("transactions", transactions)
    console.log("summary", summary)

    if (isLoading && !refreshing) return <PageLoader/>

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image resizeMode="contain" style={styles.headerLogo} source={require('../assets/images/logo.png')} />
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Welcome</Text>
                            <Text style={styles.usernameText}>{user?.emailAddresses[0].emailAddress.split("@")[0]} </Text>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.addButton} onPress={()=>{router.push("/create")}}>
                                <Ionicons name="add-circle" size={20} color="#FFF" />
                                <Text style={styles.addButtonText}>Add</Text>
                            </TouchableOpacity>
                            <SignOutButton />
                        </View>
                    </View>
                </View>
                <BalanceCard income={summary.income} balance={summary.balance} expense={summary.expense} />
                <View style={styles.transactionsHeaderContainer}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                </View>
            
            </View>
            <FlatList style={styles.transactionsList} 
            contentContainerStyle={styles.transactionsListContent}
            data={transactions} 
            renderItem={({item})=>
                <TransactionItem item={item} onDelete= {handleDelete} />
            } 
            ListEmptyComponent={<NoTransactionFound/>}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    )
}

