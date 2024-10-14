import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type IterableInputProps<T> = {
  data: T[];
  initialIndex: number;
  onChange: (data: T) => void;
  resolveTitle: (data: T) => string;
};

export function IterableInput<T>({
  data,
  initialIndex = 0,
  onChange,
  resolveTitle,
}: IterableInputProps<T>) {
  const [curr, setCurr] = useState(initialIndex);

  const handlePress = () => {
    setCurr(prevCurr => {
      const nextIndex = (prevCurr + 1) % data.length;
      onChange(data[nextIndex]!);
      return nextIndex;
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.text}>{resolveTitle(data[curr]!)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    minWidth: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12,
  },
  text: {fontWeight: 'bold'},
});
