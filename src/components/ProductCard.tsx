import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS, SIZES, normalize } from '../constants/theme';

const { width } = Dimensions.get('window');
const cardWidth = (width - (SIZES.padding * 2 + normalize(20))) / 2;

interface Rating {
  rate: number;
  count?: number;
}

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  rating?: Rating;
}

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-20%</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.category}>
          {product.category}
        </Text>

        <Text numberOfLines={1} style={styles.title}>
          {product.title}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>${product.price}</Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              ★ {product.rating?.rate || '4.2'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius + 5,
    marginBottom: normalize(15),
    marginHorizontal: normalize(5),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    overflow: 'hidden',
    marginTop: normalize(5),
  },
  imageWrapper: {
    width: '100%',
    height: normalize(140),
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(15),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  discountBadge: {
    position: 'absolute',
    top: normalize(8),
    right: normalize(8),
    backgroundColor: COLORS.danger,
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(3),
    borderRadius: normalize(6),
  },
  discountText: {
    color: COLORS.white,
    fontSize: normalize(9),
    fontWeight: 'bold',
  },
  content: {
    padding: normalize(10),
  },
  category: {
    fontSize: normalize(9),
    color: COLORS.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '600',
  },
  title: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.black,
    marginVertical: normalize(4),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(2),
  },
  price: {
    fontSize: SIZES.body - 1,
    fontWeight: '800',
    color: COLORS.primary,
  },
  ratingContainer: {
    backgroundColor: '#FFF9E7',
    paddingHorizontal: normalize(5),
    paddingVertical: normalize(2),
    borderRadius: normalize(5),
  },
  ratingText: {
    fontSize: normalize(10),
    color: COLORS.warning,
    fontWeight: 'bold',
  },
});
