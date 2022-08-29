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
	const size = {
		initial: {
			width: scWidth / 2,
			height: scWidth / 2,
		},
		final: {
			width: scWidth * 0.9,
			height: scHeight * 0.9,
			marginL: scWidth * 0.05,
			marginB: scHeight * 0.05,
		},
	};
	const size2 = {
		initial: {
			width: scWidth,
			height: scWidth / 2,
		},
		final: {
			width: scWidth * 0.9,
			height: scHeight * 0.9,
			marginL: scWidth * 0.05,
			marginB: scHeight * 0.05,
		},
	};

	return (
		<GestureHandlerRootView>
			<StatusBar style={"light"} />
			<View style={[styles.container, styles.center, { position: "relative" }]}>
				<ComponentOnLongPress size={size} initialCoordinates={{ x: 0, y: scHeight / 2 }}>
					<View style={{ height: "100%", backgroundColor: "#80A4ED", borderRadius: 15 }}>
						<Text>"lol"</Text>
					</View>
				</ComponentOnLongPress>
				<ComponentOnLongPress size={size} initialCoordinates={{ x: scWidth - size.initial.width, y: scHeight / 2 }}>
					<View style={{ height: "100%", backgroundColor: "#56E39F", borderRadius: 15 }}>
						<Text>"lol"</Text>
					</View>
				</ComponentOnLongPress>
				<ComponentOnLongPress size={size2} initialCoordinates={{ x: 0, y: 100 }}>
					<View style={{ height: "100%", backgroundColor: "#FF8CC6", borderRadius: 15 }}>
						<Text>"lol"</Text>
					</View>
				</ComponentOnLongPress>
			</View>
		</GestureHandlerRootView>
	);
}
