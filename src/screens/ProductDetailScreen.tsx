// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
//   Dimensions,
//   StatusBar,
//   Alert,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/Feather";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// import { addToCart, increaseQty, decreaseQty } from "../redux/cartSlice";
// import { RootState, AppDispatch } from "../redux/store";
// import { COLORS, SIZES, normalize } from "../constants/theme";
// import { HomeStackParamList } from "../navigation/HomeStack";

// const { width } = Dimensions.get("window");

// type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

// const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
//   const { product } = route.params;

//   const dispatch = useDispatch<AppDispatch>();
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   const cartItem = cartItems.find((item) => item.id === product.id);

//   const [localQuantity, setLocalQuantity] = useState<number>(1);
//   const currentQuantity = cartItem ? cartItem.quantity : localQuantity;

//   const handleIncrease = () => {
//     if (cartItem) {
//       dispatch(increaseQty(product.id));
//     } else {
//       setLocalQuantity((prev) => prev + 1);
//     }
//   };

//   const handleDecrease = () => {
//     if (cartItem) {
//       if (cartItem.quantity > 1) {
//         dispatch(decreaseQty(product.id));
//       }
//     } else {
//       if (localQuantity > 1) {
//         setLocalQuantity((prev) => prev - 1);
//       }
//     }
//   };

// const handleCartAction = () => {
//   if (cartItem) {
//     navigation.navigate("HomeTab", { screen: "Cart" });
//   } else {
//     dispatch(addToCart({ ...product, quantity: localQuantity }));
//     Alert.alert("Success", "Added to your bag! 🛍️");
//   }
// };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

//       <SafeAreaView style={styles.headerActions}>
//         <TouchableOpacity
//           style={styles.roundButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Icon name="chevron-left" size={normalize(24)} color={COLORS.black} />
//         </TouchableOpacity>
//       </SafeAreaView>

//       <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: product.image }} style={styles.image} />
//         </View>

//         <View style={styles.detailsWrapper}>
//           <View style={styles.dragIndicator} />

//           <View style={styles.row}>
//             <Text style={styles.category}>{product.category}</Text>

//             <View style={styles.ratingRow}>
//               <Icon
//                 name="star"
//                 size={normalize(14)}
//                 color={COLORS.warning}
//               />
//               <Text style={styles.ratingText}>
//                 {product.rating?.rate ?? 4.2}
//               </Text>
//             </View>
//           </View>

//           <Text style={styles.title}>{product.title}</Text>

//           <View style={styles.divider} />

//           <Text style={styles.sectionTitle}>Description</Text>
//           <Text style={styles.description}>{product.description}</Text>

//           <View style={styles.quantitySection}>
//             <Text style={styles.sectionTitle}>Quantity</Text>

//             <View style={styles.qtyContainer}>
//               <TouchableOpacity
//                 onPress={handleDecrease}
//                 style={styles.qtyBtn}
//               >
//                 <Icon name="minus" size={normalize(20)} color={COLORS.black} />
//               </TouchableOpacity>

//               <Text style={styles.qtyText}>{currentQuantity}</Text>

//               <TouchableOpacity
//                 onPress={handleIncrease}
//                 style={styles.qtyBtn}
//               >
//                 <Icon name="plus" size={normalize(20)} color={COLORS.black} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.footer}>
//         <View>
//           <Text style={styles.priceLabel}>Total Price</Text>

//           <Text style={styles.priceValue}>
//             ${(product.price * currentQuantity).toFixed(2)}
//           </Text>
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.primaryBtn,
//             cartItem
//               ? styles.alreadyInCartBtn
//               : { backgroundColor: COLORS.primary },
//           ]}
//           onPress={handleCartAction}
//         >
//           <Icon
//             name={cartItem ? "shopping-cart" : "shopping-bag"}
//             size={normalize(20)}
//             color={COLORS.white}
//             style={{ marginRight: normalize(10) }}
//           />

//           <Text style={styles.primaryBtnText}>
//             {cartItem ? "Go to Cart" : "Add to Cart"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ProductDetailScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.white },
//   headerActions: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: SIZES.padding,
//     paddingTop: Platform.OS === 'android' ? normalize(20) : 0,
//   },
//   roundButton: {
//     width: normalize(44),
//     height: normalize(44),
//     borderRadius: normalize(22),
//     backgroundColor: COLORS.white,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//     shadowColor: COLORS.black,
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   imageContainer: {
//     width: width,
//     height: width * 1.1,
//     backgroundColor: COLORS.background,
//     padding: normalize(50),
//   },
//   image: { 
//     width: "100%",
//     height: "100%",
//     resizeMode: "contain" 
//   },
//   detailsWrapper: {
//     backgroundColor: COLORS.white,
//     borderTopLeftRadius: normalize(35),
//     borderTopRightRadius: normalize(35),
//     marginTop: normalize(-35),
//     paddingHorizontal: SIZES.padding,
//     paddingTop: normalize(15),
//     paddingBottom: normalize(150),
//   },
//   dragIndicator: {
//     width: normalize(40),
//     height: normalize(5),
//     backgroundColor: COLORS.lightGray,
//     borderRadius: normalize(10),
//     alignSelf: "center",
//     marginBottom: normalize(20),
//   },
//   row: {
//      flexDirection: "row",
//      justifyContent: "space-between",
//       alignItems: "center"
//      },
//   category: { 
//     fontSize: normalize(13), 
//     color: COLORS.primary, 
//     fontWeight: "700", 
//     textTransform: "uppercase", 
//     letterSpacing: 1 
//   },
//   ratingRow: { 
//     flexDirection: "row", 
//     alignItems: "center", 
//     backgroundColor: "#FDF4E3", 
//     padding: normalize(6), 
//     borderRadius: normalize(10) 
//   },
//   ratingText: { fontSize: normalize(13),
//      fontWeight: "700", 
//      marginLeft: normalize(5), 
//      color: COLORS.gray 
//     },
//   title: { 
//     fontSize: SIZES.h2,
//     fontWeight: "bold", 
//     color: COLORS.black, 
//     marginTop: normalize(10),
//      marginBottom: normalize(15)
//     },
//   divider: { 
//     height: 1, 
//     backgroundColor: COLORS.border,
//      marginVertical: normalize(10)
//      },
//   sectionTitle: { 
//     fontSize: SIZES.h3, 
//     fontWeight: "700",
//      color: COLORS.black, 
//      marginBottom: normalize(10),
//       marginTop: normalize(10) 
//     },
//   description: { 
//     fontSize: SIZES.body,
//      color: COLORS.gray, 
//      lineHeight: normalize(24) 
//     },
//   quantitySection: { 
//     marginTop: normalize(25) 
//   },
//   qtyContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.background,
//     alignSelf: "flex-start",
//     borderRadius: SIZES.radius,
//     padding: normalize(6),
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },
//   qtyBtn: { 
//     width: normalize(40), 
//     height: normalize(40), 
//     backgroundColor: COLORS.white, 
//     borderRadius: normalize(12), 
//     justifyContent: "center", 
//     alignItems: "center", 
//     elevation: 3,
//     shadowColor: COLORS.black,
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   qtyText: {
//      fontSize: SIZES.h3, 
//     fontWeight: "bold",
//      marginHorizontal: normalize(20),
//       color: COLORS.black 
//     },
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     flexDirection: "row",
//     backgroundColor: COLORS.white,
//     paddingHorizontal: SIZES.padding,
//     paddingVertical: normalize(20),
//     paddingBottom: Platform.OS === 'ios' ? normalize(35) : normalize(50),
//     borderTopWidth: 1,
//     borderColor: COLORS.border,
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: width,
    
//   },
//   priceLabel: { 
//     fontSize: SIZES.small,
//     color: COLORS.gray,
//     fontWeight: "600"
//   },
//   priceValue: {
//     fontSize: SIZES.h1,
//     fontWeight: "900",
//     color: COLORS.black
//   },
//   primaryBtn: {
//     flexDirection: "row",
//     paddingHorizontal: normalize(30),
//     paddingVertical: normalize(16),
//     borderRadius: SIZES.radius,
//     alignItems: "center",
//     elevation: 5,
//   },
//   alreadyInCartBtn: {
//     backgroundColor: COLORS.secondary, 
//   },
//   primaryBtnText: {
//     color: COLORS.white,
//     fontSize: SIZES.body,
//     fontWeight: "bold"
//   },
// });



import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { addToCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { RootState, AppDispatch } from "../redux/store";

import { COLORS, SIZES, normalize } from "../constants/theme";

import { HomeStackParamList } from "../navigation/HomeStack";
import { RootTabParamList } from "../navigation/TabNavigator";

const { width } = Dimensions.get("window");

type StackProps = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

type NavigationProp = CompositeNavigationProp<
  StackProps["navigation"],
  BottomTabNavigationProp<RootTabParamList>
>;

type Props = {
  route: StackProps["route"];
  navigation: NavigationProp;
};

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartItem = cartItems.find((item) => item.id === product.id);

  const [localQuantity, setLocalQuantity] = useState<number>(1);
  const currentQuantity = cartItem ? cartItem.quantity : localQuantity;

  const handleIncrease = () => {
    if (cartItem) {
      dispatch(increaseQty(product.id));
    } else {
      setLocalQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        dispatch(decreaseQty(product.id));
      }
    } else {
      if (localQuantity > 1) {
        setLocalQuantity((prev) => prev - 1);
      }
    }
  };

  const handleCartAction = () => {
    if (cartItem) {
      navigation.navigate("Cart");
    } else {
      dispatch(addToCart({ ...product, quantity: localQuantity }));
      Alert.alert("Success", "Added to your bag! 🛍️");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.headerActions}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={normalize(24)} color={COLORS.black} />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <View style={styles.detailsWrapper}>
          <View style={styles.dragIndicator} />

          <View style={styles.row}>
            <Text style={styles.category}>{product.category}</Text>

            <View style={styles.ratingRow}>
              <Icon name="star" size={normalize(14)} color={COLORS.warning} />
              <Text style={styles.ratingText}>
                {product.rating?.rate ?? 4.2}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>

            <View style={styles.qtyContainer}>
              <TouchableOpacity
                onPress={handleDecrease}
                style={styles.qtyBtn}
              >
                <Icon name="minus" size={normalize(20)} color={COLORS.black} />
              </TouchableOpacity>

              <Text style={styles.qtyText}>{currentQuantity}</Text>

              <TouchableOpacity
                onPress={handleIncrease}
                style={styles.qtyBtn}
              >
                <Icon name="plus" size={normalize(20)} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Total Price</Text>

          <Text style={styles.priceValue}>
            ${(product.price * currentQuantity).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.primaryBtn,
            cartItem
              ? styles.alreadyInCartBtn
              : { backgroundColor: COLORS.primary },
          ]}
          onPress={handleCartAction}
        >
          <Icon
            name={cartItem ? "shopping-cart" : "shopping-bag"}
            size={normalize(20)}
            color={COLORS.white}
            style={{ marginRight: normalize(10) }}
          />

          <Text style={styles.primaryBtnText}>
            {cartItem ? "Go to Cart" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },

  headerActions: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding,
    paddingTop: Platform.OS === "android" ? normalize(20) : 0,
  },

  roundButton: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  imageContainer: {
    width: width,
    height: width * 1.1,
    backgroundColor: COLORS.background,
    padding: normalize(50),
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  detailsWrapper: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    marginTop: normalize(-35),
    paddingHorizontal: SIZES.padding,
    paddingTop: normalize(15),
    paddingBottom: normalize(150),
  },

  dragIndicator: {
    width: normalize(40),
    height: normalize(5),
    backgroundColor: COLORS.lightGray,
    borderRadius: normalize(10),
    alignSelf: "center",
    marginBottom: normalize(20),
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  category: {
    fontSize: normalize(13),
    color: COLORS.primary,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDF4E3",
    padding: normalize(6),
    borderRadius: normalize(10),
  },

  ratingText: {
    fontSize: normalize(13),
    fontWeight: "700",
    marginLeft: normalize(5),
    color: COLORS.gray,
  },

  title: {
    fontSize: SIZES.h2,
    fontWeight: "bold",
    color: COLORS.black,
    marginTop: normalize(10),
    marginBottom: normalize(15),
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: normalize(10),
  },

  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: normalize(10),
  },

  description: {
    fontSize: SIZES.body,
    color: COLORS.gray,
    lineHeight: normalize(24),
  },

  quantitySection: {
    marginTop: normalize(25),
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: normalize(6),
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  qtyBtn: {
    width: normalize(40),
    height: normalize(40),
    backgroundColor: COLORS.white,
    borderRadius: normalize(12),
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    fontSize: SIZES.h3,
    fontWeight: "bold",
    marginHorizontal: normalize(20),
    color: COLORS.black,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
    paddingVertical: normalize(20),
    borderTopWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
  },

  priceLabel: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },

  priceValue: {
    fontSize: SIZES.h1,
    fontWeight: "900",
    color: COLORS.black,
  },

  primaryBtn: {
    flexDirection: "row",
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(16),
    borderRadius: SIZES.radius,
    alignItems: "center",
  },

  alreadyInCartBtn: {
    backgroundColor: COLORS.secondary,
  },

  primaryBtnText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: "bold",
  },
});