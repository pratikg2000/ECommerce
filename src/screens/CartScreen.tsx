import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

import CartItem from '../components/CartItem';
import { clearCart, CartItem as CartItemType } from '../redux/cartSlice';
import { RootState, AppDispatch } from '../redux/store';
import { COLORS, SIZES, normalize } from '../constants/theme';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const total = items.reduce(
    (sum: number, item: CartItemType) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    Alert.alert(
      '🎉 Congratulations!',
      'Your order has been placed successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearCart());
            navigation.navigate('HomeTab', {
              screen: 'Products',
            });
          },
        },
      ],
    );
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon
          name="shopping-cart"
          size={normalize(80)}
          color={COLORS.lightGray}
        />

        <Text style={styles.emptyText}>Your cart is empty</Text>

        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => navigation.navigate('HomeTab')}
        >
          <Text style={styles.shopBtnText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Cart</Text>

      <FlatList
        data={items}
        keyExtractor={(item: CartItemType) => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.summaryCard}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
          <Icon name="arrow-right" size={normalize(20)} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    marginHorizontal: SIZES.padding,
    marginTop: 10,
    marginBottom: SIZES.padding,
    color: COLORS.black,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: SIZES.padding,
    marginBottom: Platform.OS === 'ios' ? normalize(40) : normalize(-50),
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  totalLabel: {
    fontSize: SIZES.body,
    color: COLORS.gray,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(16),
    borderRadius: SIZES.radius,
    gap: 10,
  },
  checkoutText: { color: COLORS.white, fontSize: SIZES.h3, fontWeight: 'bold' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  emptyText: {
    fontSize: SIZES.h3,
    color: COLORS.gray,
    marginTop: 20,
    fontWeight: '500',
  },
  shopBtn: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 12,
  },
  shopBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.body,
  },
});
