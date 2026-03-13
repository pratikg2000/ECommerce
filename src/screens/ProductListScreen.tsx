import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { COLORS, SIZES, normalize } from '../constants/theme';
import { HomeStackParamList } from '../navigation/HomeStack';

type Props = NativeStackScreenProps<HomeStackParamList, 'Products'>;

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'low' | 'high' | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data: Product[] = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const displayProducts = useMemo(() => {
    let result = [...products].filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );

    if (sortOrder === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, sortOrder]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Curating best products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Oops! {error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={loadProducts}>
          <Text style={styles.activeText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Discover</Text>
        <Text style={styles.subHeader}>Best products for you</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search items..."
          value={search}
          onChangeText={setSearch}
          style={styles.search}
          placeholderTextColor={COLORS.gray}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterBtn, sortOrder === 'low' && styles.activeBtn]}
          onPress={() => setSortOrder(sortOrder === 'low' ? null : 'low')}
        >
          <Text
            style={[
              styles.filterText,
              sortOrder === 'low' && styles.activeText,
            ]}
          >
            Price: Low
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, sortOrder === 'high' && styles.activeBtn]}
          onPress={() => setSortOrder(sortOrder === 'high' ? null : 'high')}
        >
          <Text
            style={[
              styles.filterText,
              sortOrder === 'high' && styles.activeText,
            ]}
          >
            Price: High
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayProducts}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(item: Product) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Product }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetail', { product: item })
            }
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>
              No matches found for "{search}"
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginBottom: Platform.OS === 'ios' ? normalize(40) : normalize(-50),
  },
  headerContainer: {
    paddingHorizontal: SIZES.padding,
    marginTop: normalize(10),
    marginBottom: normalize(15),
  },
  header: {
    fontSize: SIZES.h1,
    fontWeight: '800',
    color: COLORS.black,
  },
  subHeader: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: SIZES.padding,
    marginBottom: normalize(15),
  },
  search: {
    backgroundColor: COLORS.white,
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(15),
    borderRadius: SIZES.radius,
    fontSize: SIZES.body,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: normalize(15),
    gap: normalize(10),
  },
  filterBtn: {
    backgroundColor: COLORS.white,
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(20),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeBtn: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.gray,
    fontWeight: '600',
    fontSize: SIZES.small - 1,
  },
  activeText: {
    color: COLORS.white,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: normalize(10),
  },
  list: {
    paddingBottom: normalize(30),
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  loadingText: {
    marginTop: normalize(10),
    fontSize: SIZES.small,
    color: COLORS.primary,
    fontWeight: '500',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: normalize(50),
  },
  retryBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
    borderRadius: SIZES.radius - 5,
    marginTop: normalize(15),
  },
  errorText: {
    fontSize: SIZES.body,
    color: COLORS.danger,
  },
  emptyText: {
    fontSize: SIZES.body,
    color: COLORS.gray,
  },
});
