import React, { useEffect, useState } from "react";
import {
	Button,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Animated, { withSpring, useAnimatedStyle, useSharedValue, WithSpringConfig } from "react-native-reanimated";
import { Dimensions } from "react-native";
import { BlurView } from "expo-blur";
const styles = StyleSheet.create({
	center: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "pink",
	},
	menu: {
		height: "30%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "purple",
		borderRadius: 15,
	},
});
type Props = {
	initialPosition: { x: number; y: number };
	initialDimentions: { x: number; y: number };
	screenSize: { x: number; y: number };
	finalDimentions: { x: number; y: number };
};
const Menu = ({ initialPosition, initialDimentions, screenSize, finalDimentions }: Props) => {
	const [open, setOpen] = useState(false);

	const contentStyles = useAnimatedStyle(() => {
		const defaultSettings: WithSpringConfig = { damping: 100, stiffness: 450 };
		return {
			width: withSpring(open ? finalDimentions.x : initialDimentions.x, defaultSettings),
			height: withSpring(open ? finalDimentions.y : initialDimentions.y, defaultSettings),
			zIndex: withSpring(open ? 1 : 0, defaultSettings),
		};
	});
	const backgroundBlurStyles = useAnimatedStyle(() => {
		const defaultSettings: WithSpringConfig = { damping: 100, stiffness: 450 };
		return {
			width: withSpring(open ? screenSize.x : initialDimentions.x, defaultSettings),
			height: withSpring(open ? screenSize.y : initialDimentions.y, defaultSettings),
			borderRadius: withSpring(open ? 0 : 15),
			left: withSpring(open ? 0 : initialPosition.x, defaultSettings),
			top: withSpring(open ? 0 : initialPosition.y, defaultSettings),
			zIndex: withSpring(open ? 5 : 1, defaultSettings),
		};
	});

	function CloseBtn() {
		return (
			<TouchableHighlight
				onPress={() => setOpen(!open)}
				style={{
					position: "absolute",
					height: open ? 30 : "100%",
					backgroundColor: open ? "green" : "rgba(0,0,0,0)",
					width: open ? 30 : "100%",
					top: open ? 15 : 0,
					right: open ? 15 : 0,
				}}>
				<Text>{open && "x"}</Text>
			</TouchableHighlight>
		);
	}

	function DragAndCloseBtn() {
		return <View style={{ height: "7%", width: "100%", backgroundColor: "red", position: "absolute", top: 0 }}></View>;
	}

	return (
		<Animated.View style={[styles.center, backgroundBlurStyles, { position: "absolute" }]}>
			<BlurView
				intensity={90}
				tint="default"
				style={[styles.center, { width: open ? "100%" : "97%", height: open ? "100%" : "97%" }]}>
				<Animated.View style={[styles.menu, contentStyles, { position: "relative" }]}>
					<DragAndCloseBtn />
					<CloseBtn />
				</Animated.View>
			</BlurView>
		</Animated.View>
	);
};

export default function App() {
	const screenSize = { x: Dimensions.get("screen").width, y: Dimensions.get("screen").height };
	const { width, height } = Dimensions.get("screen");

	return (
		<View style={[styles.container, { position: "relative", justifyContent: "space-between" }]}>
			<Menu
				initialPosition={{ x: 0, y: screenSize.y / 3 }}
				initialDimentions={{ x: screenSize.x / 2 - 10, y: screenSize.y / 6 - 10 }}
				finalDimentions={{ x: Dimensions.get("window").width * 0.9, y: Dimensions.get("window").height * 0.9 }}
				screenSize={{ x: width, y: height }}
			/>
			<Menu
				initialPosition={{ x: 0, y: screenSize.y / 2 + 5 }}
				initialDimentions={{ x: screenSize.x / 2 - 10, y: screenSize.y / 6 - 10 }}
				finalDimentions={{ x: Dimensions.get("window").width * 0.9, y: Dimensions.get("window").height * 0.9 }}
				screenSize={{ x: width, y: height }}
			/>
			<Menu
				initialPosition={{ x: screenSize.x / 2 + 10, y: screenSize.y / 3 }}
				initialDimentions={{ x: screenSize.x / 2 - 10, y: screenSize.y / 3 }}
				finalDimentions={{ x: Dimensions.get("window").width * 0.9, y: Dimensions.get("window").height * 0.9 }}
				screenSize={{ x: width, y: height }}
			/>
			<View style={{ width: "100%", height: "33%", backgroundColor: "rgba(123,32,12,0.6)" }}></View>
			<View style={{ width: "100%", height: "33%", backgroundColor: "rgba(123,32,12,0.6)" }}></View>
			<View style={{ width: "100%", height: "33%", backgroundColor: "rgba(123,32,12,0.6)" }}></View>
		</View>
	);
}
