import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../../theme/colors';
import {GlobalJapaCount as GlobalJapaCountModel} from '../types/home';


interface Props {
  data?: GlobalJapaCountModel;
}


const GlobalJapaCount: React.FC<Props> = ({
  data,
}) => {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        🌍 Global Japa Count
      </Text>


      <Text style={styles.count}>
        {(
          data?.totalCount ?? 0
        ).toLocaleString()}
      </Text>


      <Text style={styles.subtitle}>
        Every chant by every devotee contributes to this divine count
      </Text>


    </View>

  );

};


export default GlobalJapaCount;



const styles = StyleSheet.create({

  container: {

    backgroundColor: Colors.secondary,

    borderRadius: 18,

    borderWidth: 1,

    borderColor: Colors.gold,

    paddingVertical: 22,

    paddingHorizontal: 18,

    marginBottom: 20,

    alignItems: 'center',

  },


  title: {

    fontSize: 18,

    fontWeight: '700',

    color: Colors.brown,

    marginBottom: 10,

  },


  count: {

    fontSize: 34,

    fontWeight: '800',

    color: Colors.gold,

    letterSpacing: 1,

  },


  subtitle: {

    marginTop: 10,

    textAlign: 'center',

    fontSize: 13,

    color: Colors.brown,

    opacity: 0.8,

  },

});