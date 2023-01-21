import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {FlatList, Pressable, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import CustomizableHeader from "../../components/headers/CustomizableHeader";
import {EllipsisVerticalIcon} from "react-native-heroicons/mini";
import {ArticleManager} from "../../core/articleManager";
import {Logger} from "../../utils/logging";
import useBookMenu from "../../components/modals/BookMenu";
import {Book} from "../../types/book";
import {Chapter} from "../../types/chapter";

export default function BookView() {
    const navigation = useNavigation()
    const route = useRoute()

    const [book, setBook] = useState((route.params as any).book as Book)
    const [chapters, setChapters] = useState([] as Chapter[])

    const [_, setShowOptionsModal, OptionsModal] = useBookMenu(book)

    const isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused) {
            Logger.debug('hydrating chapters for book ' + book.id)
            setChapters(ArticleManager.getChapters(book.id))

            // Rehydrate after the chapters are collected, to ensure consistency.
            async function rehydrateBookInformation() {
                Logger.debug('rehydrating book information ' + book.id)
                setBook(ArticleManager.getBook(book.id))
            }

            rehydrateBookInformation().then(() => {})
        }
    }, [isFocused])

    return (
        <View>
            {OptionsModal}
            <CustomizableHeader>
                <Text className={"text-lg font-bold font-black text-white"} style={{ fontStyle: 'Inter-Black' }}>{book.title}</Text>
                <Pressable className="mx-1 active:opacity-60 p-2" onPress={() => setShowOptionsModal(true)}>
                    <EllipsisVerticalIcon size={18} color={'#fff'}></EllipsisVerticalIcon>
                </Pressable>
            </CustomizableHeader>
            <View className={"p-4 py-6"}>
                <Text className={"text-sm text-zinc-200 leading-relaxed"} style={{ fontStyle: 'Inter' }}>
                    {book.description}
                </Text>
            </View>
            <View className={"p-2 px-4 bg-zinc-900 border-y border-zinc-800"}>
                <Text className={"text-sm text-zinc-200"} style={{ fontStyle: 'Inter' }}>
                    Chapters
                </Text>
            </View>
            <FlatList
                data={chapters}
                className={"bg-[#18181b] p-2 px-4 h-full"}
                renderItem={(data) => {
                    return (
                        <View className={"flex flex-row justify-between"}>
                            <Pressable className={"flex flex-row items-center gap-2 py-2 w-full active:opacity-60"}
                                       onPress={() => navigation.navigate('Editor', { book: book, chapter: data.item })}>
                                <Text className={"text-sm text-zinc-600"} style={{ fontStyle: 'Inter' }}>
                                    {data.index + 1}.
                                </Text>
                                <Text className={"text-zinc-200"} style={{ fontStyle: 'Inter' }}>
                                    {data.item.title}
                                </Text>
                            </Pressable>
                        </View>
                    )
                }}
            />
        </View>
    )
}