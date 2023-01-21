import {useEffect, useState} from "react";
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false)
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await SplashScreen.preventAutoHideAsync()
                await Font.loadAsync({
                    'Inter-Black': require('../../assets/fonts/Inter-Black.ttf'),
                    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
                    'Inter-Light': require('../../assets/fonts/Inter-Light.ttf'),
                    'Inter-LightItalic': require('../../assets/fonts/Inter-Light.ttf'),
                    'Inter-ExtraBold': require('../../assets/fonts/Inter-ExtraBold.ttf'),
                    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
                    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
                    'Inter-Thin': require('../../assets/fonts/Inter-Thin.ttf'),
                    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
                })
            } catch (e) {
                console.warn(e)
            } finally {
                setLoadingComplete(true)
                await SplashScreen.hideAsync()
            }
        }

        loadResourcesAndDataAsync()
    }, [])

    return isLoadingComplete
}