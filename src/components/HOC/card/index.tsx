import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

const Card: FC<any> = ({children, style}): React.ReactElement => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

const card = React.memo(Card);
export {card as Card};
