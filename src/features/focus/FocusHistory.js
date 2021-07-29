import React from 'react';
import {
  Image,
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform
} from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';
import deleteIcon from './delete-icon.png';

const Item = ({ item, style, onDelete, onTask, onClear }) => {
  const subject = item.item.focusSubject;
  const color = item.item.status === 0 ? 'red' : 'green';
  const index = item.index


 
    return ( 
      <View style={style}>    
        <TouchableOpacity
          style={{ flex: 1 }}  
          onPress={() => {
            onTask(index)
          }}>
          <Text style={{ fontSize: 20 }}>{subject}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          onLongPress={()=>{alert("You deleted all items!"); onClear()}}
          onPress={() => {
            onDelete(index)
          }}>
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              marginRight: 10,
            }}
            source={deleteIcon}
          />
          <View
            style={{
              backgroundColor: color,
              width: 15,
              height: 15,
              borderRadius: 7.5,
            }}></View>
        </TouchableOpacity>
      </View>
    );
};

const renderItem = (item, onDeletePress, onTaskPress, onClear) => {
  return (
    <Item
      key={item.index}
      item={item}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderStyle: 'dotted',
        borderRadius: 10,
        borderWidth: 1,
        margin: 5,
      }}
      onTask={onTaskPress}
      onDelete={onDeletePress}
      onClear={onClear}
    />
  );
};

const FocusHistory = ({ data, onClear, onDelete, onTask }) => {


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Things we've focused on</Text>
      {data.length > 0 ? (
        <View
          style={{
            flex: 1,
            margin: Platform.OS === 'ios' ? 20 : 0,
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'stretch',
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowRadius: 15,
            shadowOpacity: 0.2,
          }}> 
          <FlatList
            data={data}
            renderItem={(item) => renderItem(item, onDelete, onTask, onClear)}
            style={{
              flex: 1,
              backgroundColor: '#ffdea1',
              borderRadius: 20,
              padding: 20,
            }}
            contentContainerStyle={{}}
          /> 
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 30, color: '#ebcf34', fontWeight: 'bold' }}>Nothing Yet!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export { FocusHistory };

const styles = {
  container: {
    margin: Platform.OS === 'ios' ? 10 : 20,
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontSize: Platform.OS === 'ios' ? fontSizes.xl : fontSizes.lg,
    color: 'white',
  },
};
