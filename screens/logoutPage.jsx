import React from "react";
import { Text } from 'react-native';
import supabase from '../utils/supabase';

export default function LogoutPage({ navigation }) {
    
    async function Logout() {
        const { data, error } = await supabase.auth.getSession();
        if (!data?.session?.user) {
            return navigation.navigate('Login');
        } else {
            await supabase.auth.signOut()
            navigation.navigate('Login')
        }
    }
    
    React.useEffect(() => {
        Logout();
    }, [])

    return (
        <>
            <Text>Logging out...</Text>
        </>
    )
}