import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Loader from '../../components/atoms/loader';
import Text from '../../components/atoms/text';
import {Switch} from '../../components/atoms/switch';
import TextInput from '../../components/atoms/textInput';
import Image from '../../components/atoms/image';
import {ApiClient} from '../../network/client';
import {END_POINTS} from '../../network/contants';
import {IProduct} from './interfaces';
import {Card} from '../../components/HOC/card';
import {screenDimension} from '../../utils/dimensionUtils';
import {gifLimit} from './constants';
import {useTheme} from '@react-navigation/native';

const Home: FC<any> = (): React.ReactElement => {
  const [gifs, setGifs] = useState(null);
  const apiConfig = useRef({
    isTrending: false,
    gifSearch: '',
    offset: 0,
  });

  const debounce = useRef<number>();

  const renderProducts = useCallback(({item}: {item: IProduct}) => {
    const {title, url} = item;

    return (
      <TouchableOpacity onPress={() => {}}>
        <Card style={styles.card}>
          <Image source={{uri: url}} style={styles.productImage} />
          <View>
            <Text numberOfLines={1}>{title}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }, []);

  const renderItemSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  const getProducts = useCallback(async () => {
    const {isTrending, gifSearch} = apiConfig.current;
    const isSearching = !!gifSearch;

    try {
      const res = await ApiClient.get(
        isSearching && isTrending
          ? END_POINTS.trendingSearches
          : isTrending
          ? END_POINTS.trending
          : END_POINTS.search,
        {offset: apiConfig.current.offset, limit: gifLimit, q: gifSearch},
      );

      if (res?.data) {
        setGifs(res?.data);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSwitch = useCallback((newValue: boolean) => {
    apiConfig.current.offset = 0;
    apiConfig.current.isTrending = newValue;

    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeText = useCallback((searchText: string) => {
    debounce.current = setTimeout(() => {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }

      apiConfig.current.offset = 0;
      apiConfig.current.gifSearch = searchText;

      getProducts();
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO: Shivam: use theme for dark theme support
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      {!gifs && <Loader />}
      <TextInput style={styles.searchInput} onChangeText={onChangeText} />
      <View style={styles.switchContainer}>
        <Text>{'Switch for trending'}</Text>
        <Switch onChange={toggleSwitch} value={apiConfig.current.isTrending} />
      </View>
      <FlatList
        scrollEnabled
        data={gifs}
        renderItem={renderProducts}
        numColumns={2}
        ItemSeparatorComponent={renderItemSeparator}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnContainer}
        keyExtractor={item => `${item.id}`}
        removeClippedSubviews
        onEndReached={() => {
          apiConfig.current.offset = apiConfig.current.offset + gifLimit;
          getProducts();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  separator: {width: 24},
  columnContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 16,
  },
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenDimension.width * 0.45,
    backgroundColor: 'white',
    padding: 8,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    marginHorizontal: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'black',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

const home = React.memo(Home);
export {home as Home};
