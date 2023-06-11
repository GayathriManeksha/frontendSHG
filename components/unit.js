import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Popover from 'react-native-popover-view';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MyScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleMenuItemPress = (item) => {
    // Handle the press event for the selected menu item
    if (item === 'Attendance') {
      navigation.navigate('attendance');
    } else if (item === 'Home') {
      navigation.navigate('login');
    } else if (item === 'Members') {
      navigation.navigate('members');
    }

    // Close the menu
    setMenuVisible(false);
  };

  const handleAddMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { content: newMessage, agreed: false }]);
      setNewMessage('');
    }
  };

  const handleAgree = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].agreed = !updatedMessages[index].agreed;
    setMessages(updatedMessages);
  };
  
  const handleDisagree = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].agreed = false;
    setMessages(updatedMessages);
  };
  
  

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Unit Data</Text>
        <TouchableOpacity style={styles.menuIconContainer} onPress={handleMenuPress}>
          <MaterialIcons name="more-vert" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Popover
        isVisible={menuVisible}
        fromView={styles.menuIconContainer}
        onRequestClose={() => setMenuVisible(false)}
        popoverStyle={styles.menuPopover}
        overlayStyle={styles.overlayStyle}
      >
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Attendance')}>
          <Text>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Members')}>
          <Text>Members</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Home')}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </Popover>
      <View style={styles.messageBox}>
  {messages.map((message, index) => (
    <View key={index} style={[styles.messageItem, styles.messageContainer]}>
      <Text style={styles.messageContent}>{message.content}</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          style={[styles.iconContainer, message.agreed && styles.agreedIcon]}
          onPress={() => handleAgree(index)}
        >
          <MaterialIcons name="thumb-up" size={18} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconContainer, !message.agreed && styles.disagreedIcon]}
          onPress={() => handleDisagree(index)}
        >
          <MaterialIcons name="thumb-down" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  ))}
</View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddMessage}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  headingContainer: {
    position: 'absolute',
    width: 365,
    height: 40,
    left: 500,
    top: 0,
    backgroundColor: '#A06D95',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuIconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  menuPopover: {
    width: 150,
    borderRadius: 4,
    elevation: 4,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  overlayStyle: {
    flex: 1,
    width: width,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  messageBox: {
    position: 'absolute',
    width: 365,
    height: 250,
    left: 500,
    top: 58,
    borderRadius: 8,
    padding: 10,
   backgroundColor:'white'
  },
  messageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#8B1874',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#FFFFFF',
  },
  messageContent: {
    color: 'black',
    marginRight: 10,
 
  },
  messageContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    shadowColor: '#8B1874',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  iconsContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B1874',
    marginLeft: 8, // Adjust the value as needed
  },
 

  inputContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    height: 40,
    left: 500,
    top: 318,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#8B1874',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B1874',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default MyScreen;
