import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Directions, Gesture, GestureDetector, TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withDelay,
	withSpring,
	WithSpringConfig,
	withTiming,
} from "react-native-reanimated";
type Size = {
	initial: { width: number; height: number };
	final: { width: number; height: number; marginL: number; marginB: number };
};

type PropTypes = {
	size: Size;
	initialCoordinates: { x: number; y: number };
	timeUntilLongPressTrigger?: number;
	children: JSX.Element;
};

const ComponentOnLongPress = ({ size, timeUntilLongPressTrigger = 300, children, initialCoordinates }: PropTypes) => {
	//General
	const NO_BOUNCE = { damping: 100, stiffness: 300 };
	const MID_BOUNCE = { damping: 26, stiffness: 300 };
	const MAX_BOUNCE = { damping: 25, stiffness: 300 };
	const INDEX_ON_OPEN = 5;
	const HEADER_HEIGHT_ON_OPEN = 60;
	const animationsSettings = useSharedValue<WithSpringConfig>(NO_BOUNCE);

	const isOpen = useSharedValue(false);
	const zIndex = useSharedValue(1);
	//LongPress
	const pressing = useSharedValue(0);

	//Fling
	let initialPosY = useSharedValue(0);
	let finalPosY = useSharedValue(0);

	//Long press gesture declaration
	const openOnLongPress = Gesture.LongPress()
		.minDuration(80)
		.maxDistance(50)
		.onStart(() => {
			if (!isOpen.value) pressing.value = 1;
			animationsSettings.value = MID_BOUNCE;
		})
		.onEnd((e, success) => {
			if (isOpen.value) return null;
			pressing.value = 0;
			if (!success) return null;
			if (e.duration >= timeUntilLongPressTrigger) {
				isOpen.value = true;
				zIndex.value = INDEX_ON_OPEN;
				return console.log(`Long pressed for ${e.duration} ms!`);
			}
		});

	const openOnTap = Gesture.Tap().onStart(() => {
		if (isOpen.value) return null;
		animationsSettings.value = NO_BOUNCE;
		isOpen.value = true;
		zIndex.value = INDEX_ON_OPEN;
	});

	//Fling gesture declaration
	const openOnFlingUp = Gesture.Fling()
		.direction(Directions.DOWN | Directions.UP)
		.numberOfPointers(1)
		.onBegin((e) => {
			if (isOpen.value) return null;
			initialPosY.value = e.y;
			animationsSettings.value = MAX_BOUNCE;
		})
		.onEnd((e, success) => {
			if (isOpen.value) return null;
			if (success) {
				finalPosY.value = e.y;
				if (initialPosY.value - e.y > 50) {
					isOpen.value = true;
					zIndex.value = INDEX_ON_OPEN;
				}
			}
		});

	useDerivedValue(() => {
		if (Math.abs(finalPosY.value) > 10) {
			finalPosY.value = withTiming(0, { duration: 50 });
		}
	}, [finalPosY]);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			//Is open related
			width: withSpring(isOpen.value ? size.final.width : size.initial.width, animationsSettings.value),
			height: withSpring(isOpen.value ? size.final.height : size.initial.height, animationsSettings.value),
			transform: [
				//Fling related
				{ translateY: withSpring(finalPosY.value) },
				//Long press related
				{ scale: withTiming(interpolate(pressing.value, [0, 1], [1, 0.8]), { duration: timeUntilLongPressTrigger }) },
			],
			zIndex: zIndex.value,
			//Long press related
			opacity: withTiming(interpolate(pressing.value, [0, 1], [1, 0.5]), { duration: timeUntilLongPressTrigger }),
			backgroundColor: "#353535",
			borderRadius: 15,
			position: "absolute",
			left: withSpring(isOpen.value ? 0 : initialCoordinates.x, animationsSettings.value),
			bottom: withSpring(isOpen.value ? 0 : initialCoordinates.y, animationsSettings.value),
			marginLeft: withSpring(isOpen.value ? size.final.marginL : 0, animationsSettings.value),
			marginBottom: withSpring(isOpen.value ? size.final.marginB : 0, animationsSettings.value),
		};
	});
	const contentStyles = useAnimatedStyle(() => {
		return {
			//Is open related
			height: withSpring(
				isOpen.value ? size.final.height - HEADER_HEIGHT_ON_OPEN : size.initial.height,
				animationsSettings.value
			),
		};
	});

	const composed = Gesture.Race(openOnTap, openOnLongPress, openOnFlingUp);

	return (
		<GestureDetector gesture={composed}>
			<Animated.View style={animatedStyles}>
				<Header />
				<Animated.View style={contentStyles}>{children}</Animated.View>
			</Animated.View>
		</GestureDetector>
	);

	function Header() {
		console.log("rerender");
		const s = StyleSheet.create({
			center: {
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			},
		});

		//Fling gesture declaration
		const onFlingDownClose = Gesture.Fling()
			.direction(Directions.DOWN)
			.numberOfPointers(1)
			.shouldCancelWhenOutside(false)
			.onBegin((e) => {
				if (!isOpen.value) return null;
				animationsSettings.value = MAX_BOUNCE;
			})
			.onEnd((e, success) => {
				if (!isOpen.value) return null;
				if (success) {
					zIndex.value = withDelay(200, withTiming(1));
					return (isOpen.value = false);
				}
			});

		const headerStyles = useAnimatedStyle(() => {
			return {
				position: "relative",
				width: "100%",
				height: withTiming(isOpen.value ? HEADER_HEIGHT_ON_OPEN : 0),
				transform: [{ scale: withTiming(isOpen.value ? 1 : 0, { duration: 0.2 }) }],
			};
		});

		return (
			<GestureDetector gesture={onFlingDownClose}>
				<Animated.View style={[s.center, headerStyles]}>
					<View style={{ height: "20%", width: "30%", backgroundColor: "#BCB9B9", borderRadius: 20 }}></View>
					<Pressable
						style={{
							height: "100%",
							aspectRatio: 1,
							position: "absolute",
							right: 0,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => {
							isOpen.value = false;
							zIndex.value = withDelay(200, withTiming(1));
							animationsSettings.value = NO_BOUNCE;
						}}>
						<Text style={{ color: "#BCB9B9" }}>X</Text>
					</Pressable>
				</Animated.View>
			</GestureDetector>
		);
	}
};

export default ComponentOnLongPress;
