import React, {Component} from 'react';
import {
  PanResponder,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

export class CenterConnector extends Component {

  constructor(props) {
    super(props);

    this.position = {
      x: 0,
      y: 0,
    };

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      onPanResponderGrant: (event, gestureState) => {
        const {
          onStart
        } = this.props;

        this.position = {
          x: 0,
          y: 0,
        };

        onStart([
          0,
          0,
        ]);
      },
      onPanResponderMove: (event, gestureState) => {
        const {
          onMove
        } = this.props;

        onMove([
          gestureState.dx - this.position.x,
          gestureState.dy - this.position.y,
        ]);

        this.position = {
          x: gestureState.dx,
          y: gestureState.dy,
        };
      },
      onPanResponderTerminationRequest: (event, gestureState) => true,
      onPanResponderRelease: (event, gestureState) => {
        const {
          onEnd
        } = this.props;

        onEnd([
          gestureState.moveX,
          gestureState.moveY,
        ]);
      },
      onPanResponderTerminate: (event, gestureState) => {
      },
      onShouldBlockNativeResponder: (event, gestureState) => {
        return true;
      },
    });
  }

  render() {
    const {
      x,
      y,
      children,
    } = this.props;

    return (
      <>
        <View
          style={{
            position: 'absolute',
            left: x + 6,
            top: y + 6,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
          {...this._panResponder.panHandlers}
        />
        <View
          style={{
          position: 'absolute',
          left: x + 6,
          top: y + 6,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2
        }}>
        {children}
        </View>
      </>
    );
  }
}

CenterConnector.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.number,
  onStart: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
};
