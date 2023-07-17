import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import VectorIcons from './components/VectorIcons';
import database from '@react-native-firebase/database';

export default function App() {
  const intialState = {
    id: 0,
    title: '',
    description: '',
    completed: false,
  };

  const [todo, setTodo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState(intialState);

  const getTodos = async () => {
    const todos = await AsyncStorage.getItem('todo');
    setTodo(JSON.parse(todos) ? JSON.parse(todos) : []);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleChange = (title, value) =>
    setNewTodo({ ...newTodo, [title]: value });

  const clear = () => setNewTodo(intialState);

  const addTodo = () => {
    if (!newTodo.title || !newTodo.description) {
      alert('Please enter all the values.');
      return;
    }

    newTodo.id = todo.length + 1;
    const updatedTodo = [newTodo, ...todo];
    setTodo(updatedTodo);
    AsyncStorage.setItem('todo', JSON.stringify(updatedTodo));
    clear();
    setShowModal(false);
  };

  const updateTodo = item => {
    const itemToBeUpdated = todo.filter(todoItem => todoItem.id == item.id);
    itemToBeUpdated[0].completed = !itemToBeUpdated[0].completed;

    const remainingTodos = todo.filter(todoItem => todoItem.id != item.id);
    const updatedTodo = [...itemToBeUpdated, ...remainingTodos];

    setTodo(updatedTodo);
    AsyncStorage.setItem('todo', JSON.stringify(updatedTodo));
  };

  const displayTodo = item => (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingVertical: 16,
      }}
      onPress={() =>
        Alert.alert(`${item.title}`, `${item.description}`, [
          {
            text: item.completed ? 'Mark InProgress' : 'Mark Completed',
            onPress: () => updateTodo(item),
          },
          {
            text: 'Ok',
            style: 'cancel',
          },
        ])
      }>
      <BouncyCheckbox
        isChecked={item.completed ? true : false}
        fillColor="blue"
        onPress={() => updateTodo(item)}
      />
      <Text
        style={{
          color: '#000',
          width: '90%',
          fontSize: 16,
          textDecorationLine: item.completed ? 'line-through' : 'none',
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          paddingVertical: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 28 }}>
            Hey, M.A.H. 👋
          </Text>
          <Text style={{ fontSize: 16 }}>
            {todo.length} {todo.length == 1 ? 'task' : 'tasks'} for you
          </Text>
        </View>
        <Text>M.AhubHashmi</Text>
      </View>

      <Text style={{ color: '#000', fontSize: 28, fontWeight: 'bold' }}>
        To do 📄
      </Text>
      <ScrollView>
        <View style={{ height: 250 }}>
          {todo.map(item => (!item.completed ? displayTodo(item) : null))}
        </View>
      </ScrollView>

      <Text style={{ color: '#000', fontSize: 28, fontWeight: 'bold' }}>
        Completed ✅
      </Text>
      <ScrollView>
        <View style={{ height: 250 }}>
          {todo.map(item => (item.completed ? displayTodo(item) : null))}
        </View>
      </ScrollView>

      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            backgroundColor: 'lightblue',
            borderRadius: 100,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 60,
          }}>
          <Text style={{ fontSize: 46 }}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              paddingVertical: 20,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 28 }}>
                Hey, M.A.H. 👋
              </Text>
              <Text style={{ fontSize: 16 }}>
                {todo.length} {todo.length == 1 ? 'task' : 'tasks'} for you
              </Text>
            </View>
            <Text>M.AhubHashmi</Text>
          </View>

          <Text
            style={{
              color: '#000',
              fontSize: 28,
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            Add a Todo Item
          </Text>
          <TextInput
            placeholder="Title"
            value={newTodo.title}
            onChangeText={title => handleChange('title', title)}
            style={{
              backgroundColor: 'rgb(240, 240, 240)',
              paddingHorizontal: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
          <TextInput
            placeholder="Description"
            value={newTodo.description}
            onChangeText={desc => handleChange('description', desc)}
            style={{
              backgroundColor: 'rgb(240, 240, 240)',
              paddingHorizontal: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}
            multiline={true}
            numberOfLines={6}
          />

          <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity
              onPress={addTodo}
              style={{
                backgroundColor: 'blue',
                width: 100,
                borderRadius: 10,
                alignItems: 'center',
                padding: 10,
              }}>
              <Text style={{ fontSize: 22, color: '#fff' }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// import React, {useState} from 'react';
// import {
//   Button,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   TouchableOpacity,
//   RefreshControl,
//   ActivityIndicator,
//   Alert,
//   ToastAndroid,
// } from 'react-native';

// function App() {
//   const [list, setList] = useState([]);
//   const [text, setText] = useState('');
//   const [indexNum, setIndexNum] = useState();
//   const [refresh, setRefresh] = useState(false);

//   let add = () => {
//     if (!text) {
//       Alert.alert('Validation', 'Enter Some Text...', [
//         {
//           text: 'Okay',
//           onPress: () => {
//             console.log('Okay Press');
//           },
//         },
//       ]);
//       return;
//     }
//     if (indexNum && indexNum > -1) {
//       list[indexNum] = {
//         txt: text,
//         time: JSON.stringify(new Date()),
//       };
//       setList([...list]);
//       setIndexNum(null);
//       console.log('if');
//       ToastAndroid.show('Task Added', 5000);
//       setText('');
//     } else {
//       ToastAndroid.show('Task Added', 5000);
//       console.log('else');
//       setList([
//         ...list,
//         {
//           txt: text,
//           time: JSON.stringify(new Date()),
//         },
//       ]);
//       setText('');
//     }
//   };
//   let edit = i => {
//     setIndexNum(i);
//     let obj = list[i];
//     setText(obj.txt);
//   };

//   let abc = () => {
//     setRefresh(true);
//     setTimeout(() => {
//       setRefresh(false);
//       console.log('Refreshhh');
//     }, 3000);
//   };

//   return (
//     <>
//       <View>
//         <View style={styles.header}>
//           <Text style={styles.heading}>Todo App</Text>
//         </View>
//         <View>
//           <View style={{padding: 10}}>
//             <Text style={styles.centerText}>Enter Todo</Text>
//             <TextInput
//               value={text}
//               onChangeText={e => setText(e)}
//               placeholder="Enter Todo"
//               style={styles.inp}
//               // editable={false}
//               // multiline={true}
//               // numberOfLines={4}
//               // maxLength={10}
//               // keyboardType="numeric"
//               // keyboardType="email-address"
//               // keyboardType="number-pad"
//               // keyboardType="name-phone-pad"
//               // secureTextEntry={true}
//             />
//             <Button onPress={add} title="Add" color="maroon" />
//           </View>
//         </View>
//         <View>
//           <ScrollView
//             refreshControl={
//               <RefreshControl onRefresh={abc} refreshing={refresh} />
//             }>
//             {list &&
//               list.map((e, i) => (
//                 <TouchableOpacity
//                   onPress={() => edit(i)}
//                   onLongPress={() => {
//                     console.log('long Press ' + e.txt);
//                   }}
//                   style={{
//                     margin: 10,
//                     padding: 10,
//                     backgroundColor: 'pink',
//                     borderRadius: 8,
//                     shadowColor: '#000',
//                     shadowOffset: {
//                       width: 0,
//                       height: 7,
//                     },
//                     shadowOpacity: 0.43,
//                     shadowRadius: 9.51,

//                     elevation: 15,
//                   }}
//                   key={i}>
//                   <Text
//                     style={{
//                       fontSize: 25,
//                       color: 'maroon',
//                       borderBottomWidth: 1,
//                       borderBottomColor: 'maroon',
//                       paddingVertical: 10,
//                     }}>
//                     {e.txt}
//                   </Text>

//                   <Text style={{fontSize: 15, color: 'maroon'}}>{e.time}</Text>
//                 </TouchableOpacity>
//               ))}
//           </ScrollView>
//           <ActivityIndicator />
//         </View>
//       </View>
//     </>
//   );
// }
// export default App;

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: 'maroon',
//     padding: 10,
//   },
//   heading: {
//     fontSize: 25,
//     color: 'white',
//   },
//   inp: {
//     padding: 5,
//     textAlign: 'center',
//     borderBottomWidth: 2,
//     margin: 20,
//     fontSize: 25,
//     backgroundColor: 'pink',
//   },
//   centerText: {
//     textAlign: 'center',
//     padding: 10,
//     fontSize: 20,
//   },
// });