import {useNavigation} from "@react-navigation/native";
import {Pressable, Text} from "react-native";
import {Book} from "../../types/book";

export default function HomeBookInformation(props: { book: Book }) {
    const navigation = useNavigation()
    return (
        <Pressable
            className={"p-3 py-4 bg-white rounded-lg active:opacity-60 my-2"}
            onPress={() => navigation.navigate('View.Book', { book: props.book })}
        >
            <Text className={"text-xl text-black font-black"} style={{ fontStyle: 'Inter' }}>{props.book.title}</Text>
        </Pressable>
    )
}