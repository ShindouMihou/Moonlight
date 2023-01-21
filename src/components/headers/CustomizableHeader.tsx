import {useNavigation} from "@react-navigation/native";
import React, {ReactElement} from "react";
import {Pressable, StatusBar, View} from "react-native";
import {XMarkIcon} from "react-native-heroicons/mini";

export default function CustomizableHeader(props: { children: ReactElement[] | ReactElement }) {
    const navigation = useNavigation()
    return (
        <View className="top-0 p-4 pt-5 pb-5 bg-black border-b border-b-zinc-900 w-full">
            <View className="flex flex-row justify-between items-center">
                <Pressable className="active:opacity-60" hitSlop={50} onPress={() => navigation.goBack()}>
                    <XMarkIcon size={20} color={'#fff'}></XMarkIcon>
                </Pressable>
                {props.children}
            </View>
            <StatusBar backgroundColor={'#333333'}></StatusBar>
        </View>
    )
}