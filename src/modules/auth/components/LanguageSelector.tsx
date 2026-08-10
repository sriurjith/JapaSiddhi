import React, {useEffect, useMemo, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Colors from '../../../theme/colors';
import profileApi from '../services/profileApi';

export interface Language {
  id: number;
  code: string;
  name: string;
  nativeName: string;
}

interface Props {
  value: Language | null;
  onChange: (language: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({
  value,
  onChange,
}) => {
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');

  const [languages, setLanguages] = useState<
    Language[]
  >([]);

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      setLoading(true);

      const response =
        await profileApi.getLanguages();

      setLanguages(response);
    } finally {
      setLoading(false);
    }
  };

  const filteredLanguages = useMemo(() => {
    if (search.trim() === '') {
      return languages;
    }

    return languages.filter(
      item =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.nativeName
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  }, [languages, search]);

  const selectLanguage = (
    language: Language,
  ) => {
    onChange(language);

    setVisible(false);

    setSearch('');
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setVisible(true)}>

        <Text style={styles.selectedText}>
          {value
            ? value.nativeName
            : 'Select Language'}
        </Text>

      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={visible}>

        <View style={styles.container}>

          <TextInput
            style={styles.search}
            placeholder="Search Language"
            value={search}
            onChangeText={setSearch}
          />

          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.primary}
            />
          ) : (
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={filteredLanguages}
              keyExtractor={item =>
                item.code
              }
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() =>
                    selectLanguage(item)
                  }>

                  <Text
                    style={styles.itemText}>
                    {item.nativeName}
                  </Text>

                  <Text
                    style={styles.code}>
                    {item.name}
                  </Text>

                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </Modal>
    </>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  selector: {
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },

  selectedText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },

  search: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  item: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ECECEC',
  },

  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  code: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 3,
  },
});