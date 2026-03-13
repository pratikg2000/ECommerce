import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeItem } from '../redux/cartSlice';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SIZES, normalize } from '../constants/theme';

interface CartItemType {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.details}>
        <View style={styles.headerRow}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>

          <TouchableOpacity
            onPress={() => dispatch(removeItem(item.id))}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="trash-2" size={normalize(18)} color={COLORS.danger} />
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>${item.price}</Text>

        <View style={styles.footerRow}>
          <View style={styles.qtySelector}>
            <TouchableOpacity
              onPress={() => dispatch(decreaseQty(item.id))}
              style={styles.qtyBtn}
            >
              <Icon name="minus" size={normalize(16)} color={COLORS.black} />
            </TouchableOpacity>

            <Text style={styles.qtyText}>{item.quantity}</Text>

            <TouchableOpacity
              onPress={() => dispatch(increaseQty(item.id))}
              style={styles.qtyBtn}
            >
              <Icon name="plus" size={normalize(16)} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <Text style={styles.lineTotal}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: normalize(12),
    marginBottom: normalize(15),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: normalize(75),
    height: normalize(75),
    borderRadius: normalize(10),
    backgroundColor: COLORS.background,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginLeft: normalize(15),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.body - 1,
    fontWeight: '600',
    color: COLORS.black,
    flex: 1,
    marginRight: normalize(10),
  },
  price: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginVertical: normalize(4),
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(5),
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: normalize(8),
    padding: normalize(4),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  qtyBtn: {
    width: normalize(28),
    height: normalize(28),
    backgroundColor: COLORS.white,
    borderRadius: normalize(6),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  qtyText: {
    marginHorizontal: normalize(12),
    fontWeight: 'bold',
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  lineTotal: {
    fontSize: SIZES.body,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
