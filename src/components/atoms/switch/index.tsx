import React, {FC, useState} from 'react';
import {Switch as RNSwitch} from 'react-native';

interface IProps {
  onChange: (newValue: boolean) => void;
  value?: boolean;
}

const Switch: FC<IProps> = ({onChange, value = false}) => {
  const [switchValue, setSwitchValue] = useState(value);

  const onSwitch = (newValue: boolean) => {
    onChange(newValue);

    setSwitchValue(newValue);
  };

  return (
    <RNSwitch
      trackColor={{false: '#767577', true: '#81b0ff'}}
      thumbColor={'#f5dd4b'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onSwitch}
      value={switchValue}
    />
  );
};

const switchComp = React.memo(Switch);
export {switchComp as Switch};
