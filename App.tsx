import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ComponentOnLongPress from "./ComponentOnLongPress";
import Final from "./Final";
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
		backgroundColor: "#1B1A1A",
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

export default function App() {
	const { width: scWidth, height: scHeight } = Dimensions.get("window");
	const initialSize = {
		initial: {
			width: scWidth / 2,
			height: scWidth / 2,
		},
		final: {
			width: scWidth * 0.9,
			height: scHeight * 0.9,
		},
	};
	const [gamer, setGamer] = useState(0);

	return (
		<GestureHandlerRootView>
			<StatusBar style={"light"} />
			<View style={[styles.container, styles.center]}>
				<ComponentOnLongPress size={initialSize}>
					<View style={{ height: "100%" }}>
						<Text>"lol"</Text>
					</View>
				</ComponentOnLongPress>
			</View>
		</GestureHandlerRootView>
	);
}
