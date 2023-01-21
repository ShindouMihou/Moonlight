import {useNavigation, useRoute} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {Pressable, ScrollView, Text, TextInput, View} from "react-native";
import CustomizableHeader from "../../components/headers/CustomizableHeader";
import uuid from 'react-native-uuid';
import {ArticleManager} from "../../core/articleManager";
import {Book} from "../../types/book";

export default function UpsertBook() {
    const navigation = useNavigation()
    const route = useRoute()

    const book: Book | null = (route.params as any)?.book

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')

    useEffect(() => {
        if (book != null) {
            setTitle(book.title)
            setDescription(book.description)
            setTags(book.tags.join(', '))
        }
    }, [])

    const [error, setError] = useState(null as string | null)
    return (
        <View>
            <ScrollView>
                <CustomizableHeader>
                    <Pressable className="active:opacity-60" onPress={() => create(book?.id, title, description, tags, setError, navigation)}>
                        <Text className="text-white text-lg" style={{ fontFamily: 'Inter-Bold'}}>{ book == null ? 'Create' : 'Update' }</Text>
                    </Pressable>
                </CustomizableHeader>
                <View className={"p-4"}>
                    {error == null ? null : (
                        <View className="mb-6 border border-red-500 rounded-xl p-3">
                            <Text className="text-white text-xs" style={{ fontFamily: 'Inter-Light' }}>{error}</Text>
                        </View>
                    )}
                    <View className="pb-8">
                        <Text className="text-white uppercase" style={{ fontFamily: 'Inter-Bold'}}>Name</Text>
                        <TextInput
                            className="text-white border-b-2 border-b-zinc-600 py-2 my-2 max-h-32"
                            placeholder="Book Name"
                            placeholderTextColor={"#9ca3af"}
                            style={{ fontFamily: 'Inter-Regular' }}
                            multiline={false}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        ></TextInput>
                    </View>
                    <View className="pb-8">
                        <Text className="text-white uppercase" style={{ fontFamily: 'Inter-Bold'}}>Description</Text>
                        <TextInput
                            className="text-white border-b-2 border-b-zinc-600 py-2 my-2 max-h-64"
                            placeholder="Book Description"
                            placeholderTextColor={"#9ca3af"}
                            style={{ fontFamily: 'Inter-Regular' }}
                            multiline={true}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        ></TextInput>
                    </View>
                    <View className="pb-8">
                        <Text className="text-white uppercase" style={{ fontFamily: 'Inter-Bold'}}>Tags</Text>
                        <Text className="text-xs text-zinc-400" style={{ fontFamily: 'Inter'}}>separate with commas</Text>
                        <TextInput
                            className="text-white border-b-2 border-b-zinc-600 py-2 my-2 max-h-32"
                            placeholder="Book Tags (e.g. fantasy, romance)"
                            placeholderTextColor={"#9ca3af"}
                            style={{ fontFamily: 'Inter-Regular' }}
                            multiline={false}
                            value={tags}
                            onChangeText={(text) => setTags(text)}
                        ></TextInput>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

async function create(id: string | null, title: string, description: string, tags: string, setError: any, navigation: any) {
    if (title.length == 0 || description.length == 0) {
        setError('You cannot leave the title, or description empty.')
        return
    }
    if (title.length > 256) {
        setError('You cannot have a title longer than 256 characters.')
        return
    }
    if (description.length > (1024 * 5)) {
        setError('You cannot have a description longer than ' + (1024 * 5) + ' characters.')
        return
    }

    let book: Book = { id: uuid.v4().toString(), title: title, description: description, tags: tags.split(", "), articles: [] }

    if (id != null) {
        book = ArticleManager.getBook(id)
        book.title = title
        book.description = description
        book.tags = tags.split(', ')
    }

    ArticleManager.createBook(book)

    navigation.navigate('View.Book', { book })
}