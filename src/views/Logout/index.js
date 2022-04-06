import React from 'react';
import * as AuthSession from 'expo-auth-session';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const auth0ClientId = "npX9NVg5M9ec8buzq2VVsQeX3PMKavdr";
const authorizationEndpoint = "http://dev-aa7s4e1w.us.auth0.com/v2/logout";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy }); // <-- must be set in allowed logout urls

export default function Logout({ navigation }) {
    const logout = async () => {
        try {
            console.log(redirectUri);
            console.log(`${authorizationEndpoint}?client_id=${auth0ClientId}&returnTo=${redirectUri}`)
            const res = await axios.get(`${authorizationEndpoint}?client_id=${auth0ClientId}&federated`)
            // const res = await openAuthSessionAsync(`${authorizationEndpoint}?client_id=${auth0ClientId}`, redirectUri);
            // console.log(res)
            res.status == 200 ? navigation.navigate('Login') : null;
            // handle unsetting your user from store / context / memory
        } catch (err) {
            console.error('error', err)
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center'
        }}>
            <Button
                title="Logout"
                onPress={logout}
            />
        </View>
    );
}