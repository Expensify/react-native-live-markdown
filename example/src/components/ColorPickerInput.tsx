import React from 'react';
import {TouchableOpacity, StyleSheet, Button} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import ColorPicker, {HueSlider, Panel1} from 'reanimated-color-picker';

type ColorPickerInputProps = {
  color?: string;
  onChangeColor: (color: string) => void;
};

export const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  color = '#000000',
  onChangeColor,
}) => {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const openModal = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <TouchableOpacity
        style={[styles.colorSquare, {backgroundColor: color}]}
        onPress={openModal}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['50%']}
        style={styles.bottomSheet}>
        <BottomSheetView style={{padding: 24}}>
          <ColorPicker
            value={color}
            onChange={color => onChangeColor(color.hex)}
            style={styles.colorPicker}>
            <HueSlider />
            <Panel1 />
          </ColorPicker>
          <Button
            title="Change color"
            onPress={() => bottomSheetModalRef?.current?.close()}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  colorSquare: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  bottomSheet: {
    flex: 1,
  },
  colorPicker: {
    gap: 8,
  },
});
