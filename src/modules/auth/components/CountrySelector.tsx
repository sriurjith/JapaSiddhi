import React, {useMemo, useState} from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

import Colors from '../../../theme/colors';
import countries, {
  CountryItem,
} from '../../../constants/countries';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: CountryItem) => void;
}

const CountrySelector: React.FC<Props> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const [search, setSearch] = useState('');

  const filteredCountries = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return countries;
    }

    return countries.filter(
      item =>
        item.name.toLowerCase().includes(keyword) ||
        item.code.toLowerCase().includes(keyword) ||
        item.callingCode.includes(keyword),
    );
  }, [search]);

  const handleSelect = (country: CountryItem) => {
    onSelect(country);
    setSearch('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Select Country
        </Text>

        <TextInput
          style={styles.search}
          placeholder="Search Country"
          placeholderTextColor={Colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredCountries}
          keyExtractor={item => item.code}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => handleSelect(item)}>
              <Text style={styles.flag}>
                {item.flag}
              </Text>

              <View style={styles.info}>
                <Text style={styles.name}>
                  {item.name}
                </Text>

                <Text style={styles.countryCode}>
                  {item.code}
                </Text>
              </View>

              <Text style={styles.callingCode}>
                {item.callingCode}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default CountrySelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 20,
  },

  search: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: Colors.white,
    color: Colors.textPrimary,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  flag: {
    fontSize: 24,
    width: 45,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  countryCode: {
    marginTop: 2,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  callingCode: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
});