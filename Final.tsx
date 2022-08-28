import * as React from "react";
import { Text, View } from "react-native";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	call,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useCode,
	useDerivedValue,
	useSharedValue,
	withDecay,
	withSpring,
	withTiming,
} from "react-native-reanimated";

type Size = {
	initial: { width: number; height: number };
	final: { width: number; height: number };
};

type PropTypes = {
	size: Size;
};

const Final = ({ size }: PropTypes) => {
	const WIDTH = [150, 300];
	const HEIGHT = [150, 300];
	let initialPosY = useSharedValue(0);
	let finalPosY = useSharedValue(0);

	const isOpen = useSharedValue(false);

	const flingGestureVertical = Gesture.Fling()
		.direction(Directions.DOWN | Directions.UP)
		.numberOfPointers(1)
		.onBegin((e) => {
			initialPosY.value = e.y;
		})
		.onEnd((e, success) => {
			if (success) {
				finalPosY.value = e.y;
				if (initialPosY.value - e.y > 50) {
					isOpen.value = true;
				}
				if (initialPosY.value - e.y < -50) {
					isOpen.value = false;
				}
			}
		});

	const animatedStyles = useAnimatedStyle(() => {
		return {
			width: withSpring(isOpen.value ? WIDTH[1] : WIDTH[0]),
			height: withSpring(isOpen.value ? HEIGHT[1] : HEIGHT[0]),
			backgroundColor: isOpen.value ? "yellow" : "blue",
			transform: [{ translateY: withSpring(finalPosY.value) }],
		};
	});

	//Handles bounce back
	useDerivedValue(() => {
		if (finalPosY.value > 30) {
			finalPosY.value = withTiming(0, { duration: 100 });
		}
	}, [finalPosY]);

	return (
		<GestureDetector gesture={flingGestureVertical}>
			<Animated.View style={animatedStyles}>
				<Text>3</Text>
			</Animated.View>
		</GestureDetector>
	);
};

export default Final;
