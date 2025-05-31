import {View, Text} from "react-native";
import {ReactNode} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {COLORS} from "@/constants/colors";

const SafeScreen = ({...props}) => {

    const insets = useSafeAreaInsets();

    return (
        <View style={{paddingTop: insets.top, flex: 1, backgroundColor: COLORS.background}}>
            {props.children}
        </View>
    )
}

export default SafeScreen;