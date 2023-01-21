import {Pressable, Text} from "react-native";
import React, {ReactNode} from "react";

export function MiniPillButton(props: { icon: ReactNode, color: string, text: string, onPress: () =>  void}) {
    return (
        <Pressable className={"p-1 mr-1 px-3 rounded-full flex flex-row items-center active:opacity-60 " + props.color} onPress={props.onPress}>
            {props.icon}
            <Text className={"text-xs px-1 text-white"} style={{ fontStyle: 'Inter' }}>{props.text}</Text>
        </Pressable>
    )
}