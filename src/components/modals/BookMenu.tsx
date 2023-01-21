import {useNavigation} from "@react-navigation/native";
import React, {ReactElement, useState} from "react";
import BottomHalfModal, {modalItem, modalTitle} from "../core/BottomHalfModal";
import {BookOpenIcon, CheckIcon, PencilIcon, TrashIcon, XMarkIcon} from "react-native-heroicons/solid";
import {Text} from "react-native";
import {ArticleManager} from "../../core/articleManager";
import {Book} from "../../types/book";

export default function useBookMenu(book: Book): [boolean, React.Dispatch<React.SetStateAction<boolean>>, ReactElement] {
    const navigation = useNavigation()
    const [showDeleteWarning, setShowDeleteWarning] = useState(false)
    
    const [visible, setVisible] = useState(false)
    if (showDeleteWarning) {
        return [
            visible,
            setVisible,
            (
                <BottomHalfModal onCancel={() => setShowDeleteWarning(false)} visible={showDeleteWarning}>
                    <Text className="text-sm text-white px-4 py-2" style={{fontFamily: 'Inter-Regular'}}>
                        Are you sure you want to delete this book? This is an irreversible action!
                    </Text>
                    {modalItem(
                        (size, color) => <CheckIcon size={size} color={color}></CheckIcon>,
                        'Continue',
                        setShowDeleteWarning,
                        () => {
                            ArticleManager.deleteBook(book.id)
                            navigation.replace('Home')
                        }
                    )}
                    {modalItem(
                        (size, color) => <XMarkIcon size={size} color={color}></XMarkIcon>,
                        'Cancel',
                        setShowDeleteWarning,
                        () => {
                        }
                    )}
                </BottomHalfModal>
            )
        ]
    }

    return [
        visible,
        setVisible,
        (
            <BottomHalfModal visible={visible} onCancel={() => setVisible(false)}>
                {modalTitle('Book')}
                {modalItem(
                    (size, color) => <PencilIcon size={size} color={color}></PencilIcon>,
                    'Edit',
                    setVisible,
                    () => navigation.navigate('Upsert.Book', {book: book})
                )}
                {modalItem(
                    (size, color) => <BookOpenIcon size={size} color={color}></BookOpenIcon>,
                    'New Chapter',
                    setVisible,
                    () => navigation.navigate('Editor', { book: book })
                )}
                {modalItem(
                    (size, color) => <TrashIcon size={size} color={color}></TrashIcon>,
                    'Delete',
                    setVisible,
                    () => setShowDeleteWarning(true)
                )}
            </BottomHalfModal>
        )
    ]
}