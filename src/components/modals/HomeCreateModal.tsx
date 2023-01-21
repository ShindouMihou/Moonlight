import {useNavigation} from "@react-navigation/native";
import React, {ReactNode, useState} from "react";
import BottomHalfModal, {modalItem, modalTitle} from "../core/BottomHalfModal";
import {BookOpenIcon} from "react-native-heroicons/mini";

export default function useHomeMenu(): [boolean, React.Dispatch<React.SetStateAction<boolean>>, ReactNode] {
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    return [
        visible,
        setVisible,
        (
            <BottomHalfModal visible={visible} onCancel={() => setVisible(false)}>
                {modalTitle('Create')}
                {modalItem(
                    (size, color) => <BookOpenIcon size={size} color={color}></BookOpenIcon>,
                    'Book',
                    setVisible,
                    () => navigation.navigate('Upsert.Book')
                )}
            </BottomHalfModal>
        )
    ]
}