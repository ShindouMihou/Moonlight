import Header from "../core/Header";
import {Pressable} from "react-native";
import {PlusIcon} from "react-native-heroicons/solid";
import React from "react";
import useHomeMenu from "../modals/HomeCreateModal";

export default function HomeHeader() {
    const [_, setShowHomeMenu, HomeMenu] = useHomeMenu()
    return (
        <Header>
            <Pressable className="mx-1 active:opacity-60 p-2 bg-zinc-900 rounded-full" onPress={() => setShowHomeMenu(true)}>
                <PlusIcon size={18} color={'#fff'}></PlusIcon>
            </Pressable>
            {HomeMenu}
        </Header>
    )
}