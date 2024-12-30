import * as React from 'react';
import { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';

function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraReady, setCameraReady] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraReady) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        setPhoto(photo.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const cameraRef = React.useRef(null);

  if (hasPermission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={cameraRef}
        onCameraReady={handleCameraReady}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={handleTakePicture} style={{position:'absolute',bottom:0,right:0}}>
            <Text>Take picture</Text>
          </TouchableOpacity>
          {photo && <Image source={{uri: photo}} style={{flex:1}} />}
        </View>
      </Camera>
    </View>
  );
}

export default App;