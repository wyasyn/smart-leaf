import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

type ScanPreviewViewProps = {
  uri: string;
};

export function ScanPreviewView({ uri }: ScanPreviewViewProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} contentFit="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    width: '100%',
  },
});
