import React from "react";
import {Pressable, Text, View} from "react-native";
import ReactNativeModal from "react-native-modal";

export default function BottomHalfModal(props: { visible: boolean, onCancel: () => void, children: React.ReactNode }) {
    return (
        <ReactNativeModal
            isVisible={props.visible}
            swipeDirection={'down'}
            onSwipeComplete={props.onCancel}
            onDismiss={props.onCancel}
            onBackButtonPress={props.onCancel}
            onBackdropPress={props.onCancel}
            statusBarTranslucent={true}
            backdropTransitionOutTiming={0}
            className="justify-end m-0"
        >
            <View>
                <View className="pb-1 bg-zinc-200 w-32 mx-auto mb-2 rounded-full"></View>
                <View className="bg-zinc-800 pb-12 pt-4">
                    {props.children}
                </View>
            </View>
        </ReactNativeModal>
    )
}

export function modalTitle(text: string) {
    return <Text className="px-4 py-1 text-white uppercase text-lg" style={{ fontFamily: 'Inter-Bold' }}>{text}</Text>
}

export function modalItem(icon: (size: number, color: string) => JSX.Element, text: string, setVisible: React.Dispatch<React.SetStateAction<boolean>>, onPress: () => void) {
    return (
        <Pressable className="p-4 flex flex-row items-center active:opacity-60 active:bg-zinc-700" onPress={() => {
            setVisible(false)
            onPress()
        }}>
            {icon(16, '#fff')}
            <Text className="text-zinc-100 pl-4" style={{ fontFamily: 'Inter-Regular' }}>{text}</Text>
        </Pressable>
    )
}