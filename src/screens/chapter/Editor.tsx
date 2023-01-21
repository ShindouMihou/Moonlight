import {useIsFocused, useRoute} from "@react-navigation/native";
import {ScrollView, Text, TextInput, View} from "react-native";
import CustomizableHeader from "../../components/headers/CustomizableHeader";
import React, {useEffect, useMemo, useState} from "react";
import {ArticleManager} from "../../core/articleManager";
import uuid from "react-native-uuid";
import {Book} from "../../types/book";
import {Chapter} from "../../types/chapter";

export default function Editor() {
    const route = useRoute()
    const isFocused = useIsFocused()

    const book: Book = (route.params as any).book
    const [chapter, setChapter] = useState((route.params as any).chapter as Chapter | null)

    useMemo(() => {
        if (chapter == null) {
            const [_, result] = upsert(null, '', '', book.id)
            setChapter(result)
        }
    }, [chapter])

    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('')

    useEffect(() => {
        if (isFocused && chapter != null) {
            setTitle(chapter.title)
            setContents(chapter.contents)
        }
    }, [isFocused])

    function save() {
        upsert(chapter.id, title, contents, book.id)
    }

    useEffect(() => {
        let timer = setInterval(save, 5_000)
        return () => clearInterval(timer)
    })

    // TODO: Figure out how to optimize the text input for massive prompts (e.g. > 500 words).
    return (
        <View>
            <ScrollView>
                <CustomizableHeader>
                </CustomizableHeader>
                <View className={"p-4 flex flex-col"}>
                    <TextInput
                        className={"text-white text-2xl text-center"}
                        style={{fontFamily: 'Inter'}}
                        autoCapitalize={"none"}
                        defaultValue={title}
                        cursorColor={'#fff'}
                        autoCorrect={false}
                        maxLength={512}
                        placeholderTextColor={"#9ca3af"}
                        onChangeText={(text) => setTitle(text)}
                        placeholder={"Your Title"}
                    />
                    <TextInput
                        className={"text-white text-sm flex-grow"}
                        style={{fontFamily: 'Inter'}}
                        multiline={true}
                        autoCapitalize={"none"}
                        defaultValue={contents}
                        cursorColor={'#fff'}
                        autoCorrect={false}
                        placeholderTextColor={"#9ca3af"}
                        onChangeText={(text) => setContents(text)}
                        placeholder={"Believe in yourself and your imagination."}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

function upsert(id: string | null, title: string, contents: string, book: string): [string | null, Chapter | null] {
    let chapter: Chapter = { id: uuid.v4().toString(), title: title, contents: contents, created_at: new Date(), updated_at: new Date() }
    if (id != null) {
        chapter = ArticleManager.getChapter(id)
        chapter.title = title
        chapter.contents = contents
        chapter.updated_at = new Date()
    }

    ArticleManager.createChapter(book, chapter)
    return [null, chapter]
}