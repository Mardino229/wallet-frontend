
import { styles } from '@/assets/styles/home.styles'
import { COLORS } from '@/constants/colors'
import { useClerk } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import { Alert, Text, TouchableOpacity } from 'react-native'

export const SignOutButton = () => {
    // Use `useClerk()` to access the `signOut()` function
    const { signOut } = useClerk()
    const handleLogout = async ()=> {
        try {
            await signOut()
            // Redirect to your desired page
            Linking.openURL(Linking.createURL('/sign-in'))
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }
    const handleSignOut = async () => {
        Alert.alert("Logout", "Are you sureyou want to logout? ",
            [
                {text: "Cancel", style: "cancel"},
                {text: "Logout", style: "destructive", onPress: handleLogout},
            ]
        )
    }
    
    return (
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Ionicons name='log-out-outline' size={22} color={COLORS.text}/>
        </TouchableOpacity>
    )
}