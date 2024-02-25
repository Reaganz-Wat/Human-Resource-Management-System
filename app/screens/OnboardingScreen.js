import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
            onDone={()=> navigation.navigate('GetStartedScreen')}
            onSkip={()=> navigation.navigate('GetStartedScreen')}
            pages={[
                {
                backgroundColor: '#fff',
                image: <Image style = {onboardingStyles.imageStyle} source={require('../../assets/onboarding-img1.png')} />,
                title: 'Welcome to HRMS',
                subtitle: 'Streamline Your HR Processes',
                },
                {
                backgroundColor: '#fff',
                image: <Image style = {onboardingStyles.imageStyle} source={require('../../assets/onboarding-img2.png')} />,
                title: 'Discover Our HR Platform',
                subtitle: 'Efficient Solutions for Your HR Needs',
                },
                {
                backgroundColor: '#caf0f8',
                image: <Image style = {onboardingStyles.imageStyle} source={require('../../assets/onboarding-img3.png')} />,
                title: 'Introducing HR Solutions',
                subtitle: 'Enhance Efficiency and Productivity',
                }
            ]}
        />
    );
}

const onboardingStyles = StyleSheet.create({
    imageStyle: {
        width: 250,
        height: 250
    }
})

export default OnboardingScreen;