import {FlatList, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {PlusIcon} from "react-native-heroicons/solid";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {MiniPillButton} from "../components/buttons/MiniPillButton";
import HomeBookInformation from "../components/home/HomeBookInformation";
import {ArticleManager} from "../core/articleManager";
import {Logger} from "../utils/logging";
import {Book} from "../types/book";

export default function HomeScreen() {
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    const [books, setBooks] = useState([] as Book[])
    useEffect(() => {
        if (isFocused) {
            Logger.debug('hydrating books for homepage')
            setBooks(ArticleManager.getBooks())
        }
    }, [isFocused])

    return (
        <View className={"p-4 py-6"}>
            <View className={"p-3 py-4 rounded-lg bg-white"}>
                <Text className={"text-lg font-bold font-black"} style={{ fontStyle: 'Inter-Black' }}>Welcome to Moonlight</Text>
                <Text className={"text-xs"} style={{ fontStyle: 'Inter' }}>
                    What do you have in mind for today, how about writing a new story, or maybe a new chapter?
                </Text>
                <View className={"flex flex-row my-2"}>
                    <MiniPillButton
                        icon={<PlusIcon size={18} color={'#fff'}></PlusIcon>}
                        color={'bg-zinc-900'}
                        text={'Create Book'}
                        onPress={() => navigation.navigate('Upsert.Book')}
                    />
                </View>
            </View>
            <FlatList
                data={books}
                className={"py-4"}
                renderItem={(data) => <HomeBookInformation book={data.item}/>}
            />
        </View>
    )
}