import {StatusBar, Text, View} from "react-native";
import React, {ReactNode} from "react";

export default function Header(props: { children: ReactNode }) {
    return (
        <View className="bg-black p-4 w-full border-b border-b-zinc-900 flex flex-row justify-between z-10">
            <Text className="text-lg text-white leading-none font-black" style={{ fontStyle: 'Inter' }}>Moonlight</Text>
            <View className="flex flex-row">
                {props.children}
            </View>
            <StatusBar backgroundColor={'#000'}></StatusBar>
        </View>
    )
}