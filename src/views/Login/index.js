import * as AuthSession from 'expo-auth-session';
import React from 'react';
import { Alert, Platform, StyleSheet, Image, View, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
// you need to swap out these details with your auth0 credientals
const auth0ClientId = "npX9NVg5M9ec8buzq2VVsQeX3PMKavdr";
const authorizationEndpoint = "http://dev-aa7s4e1w.us.auth0.com/authorize";


const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

console.log(redirectUri)  // <-- you will need to add this to your auth0 callbacks / logout configs

export default function Login({ navigation }) {
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            redirectUri,
            clientId: auth0ClientId,
            // id_token will return a JWT token
            responseType: 'id_token',
            // retrieve the user's profile
            scopes: ['openid', 'profile', 'email'],
            extraParams: {
                // ideally, this will be a random value
                nonce: 'nonce',
            },
        },
        { authorizationEndpoint }
    );

    React.useEffect(() => {
        console.log(result);
        try {
            if (result) {
                const { params, type } = result;
                const { id_token } = params;
                console.log('token', id_token, 'type', type);
                type === 'success' ? navigation.navigate('Logout') : console.log('login failed');
            }
        } catch (error) {
            console.log(error);
        }
    }, [result]);

    return (
        <View style={tw`flex bg-orange-300 h-full`}>
            <View style={tw`bg-white w-full h-3/4 absolute bottom-0 p-10`}>
                <Text style={tw`font-bold text-4xl text-center`}>Welcome Back</Text>
                <Text style={tw`text-center text-green-700 font-bold`}>Login to your account</Text>
                {/* input form */}
                <View style={tw`my-10`}>
                    <Text style={tw`font-bold text-black`}>Username</Text>
                    <TextInput style={tw`border border-slate-400 rounded-lg h-10 px-8 mb-5`} />
                    <Text style={tw`font-bold text-black`}>Password</Text>
                    <TextInput secureTextEntry style={tw`border border-slate-400 rounded-lg h-10 px-8 mb-5`} />
                    <Text style={tw`text-right text-purple-700 font-bold`}>Forgot password</Text>
                </View>
                <TouchableOpacity style={tw`rounded bg-purple-600 px-10 py-2 w-3/4 self-center`}>
                    <Text style={tw`text-white text-lg text-center`}>Log In</Text>
                </TouchableOpacity>

                {/* login with */}
                <Text style={tw`my-10 text-center text-slate-300 font-bold `}>Or Login with</Text>
                <TouchableOpacity style={tw`rounded-full border bg-white w-30 flex flex-row p-2 mx-auto`} onPress={() => promptAsync({ useProxy })}>
                    <AntDesign name="google" size={30} color="black" />
                    <Text style={tw`text-right text-slate-300 font-bold text-lg ml-2`}>Google</Text>
                </TouchableOpacity>
                <Text style={tw`my-10 text-center text-slate-300 font-bold `}>Don't have an account? Register</Text>
            </View>
        </View>
    );
}