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
	const initial = { width: scWidth / 2, height: scWidth / 2 };
	const initial2 = { width: scWidth, height: scWidth / 2 };

	return (
		<GestureHandlerRootView>
			<StatusBar style={"light"} />
			<View style={[styles.container, styles.center, { position: "relative" }]}>
				<ComponentOnLongPress
					size={initial2}
					initialCoordinates={{ x: 0, y: scHeight - initial2.height }}
					screenSize={{ width: scWidth, height: scHeight }}>
					<View style={{ height: "100%", backgroundColor: "#80A4ED", borderRadius: 15 }}>
						<Text>"lol"</Text>
					</View>
				</ComponentOnLongPress>
				<ComponentOnLongPress
					size={initial}
					initialCoordinates={{ x: 0, y: 0 }}
					screenSize={{ width: scWidth, height: scHeight }}>
					<View style={{ height: "100%", backgroundColor: "#80A4ED", borderRadius: 15 }}>
						<Text>"lol"</Text>
					</View>
				</ComponentOnLongPress>
				<ComponentOnLongPress
					size={initial}
					initialCoordinates={{ x: scWidth - initial.width, y: 0 }}
					screenSize={{ width: scWidth, height: scHeight }}>
					<View style={{ height: "100%", backgroundColor: "#80A4ED", borderRadius: 15 }}>
						<Text>"lol"</Text>
					</View>
				</ComponentOnLongPress>
			</View>
		</GestureHandlerRootView>
	);
}
