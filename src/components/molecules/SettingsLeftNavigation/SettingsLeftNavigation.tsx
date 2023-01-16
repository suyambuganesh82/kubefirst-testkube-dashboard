import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {StyledNavigationContatner, StyledNavigationOptionContainer} from './SettingsLeftNavigation.styled';

type SettingsLeftNavigationProps = {
  options: string[];
  selectedOption: number;
  setSelectedOption: (index: number) => void;
};

const SettingsLeftNavigation: React.FC<SettingsLeftNavigationProps> = props => {
  const {options, selectedOption, setSelectedOption} = props;

  return (
    <StyledNavigationContatner>
      {options.map((value, index) => (
        <StyledNavigationOptionContainer key={value} onClick={() => setSelectedOption(index)}>
          <Text className="bold middle" color={selectedOption === index ? Colors.slate50 : Colors.slate400}>
            {value}
          </Text>
        </StyledNavigationOptionContainer>
      ))}
    </StyledNavigationContatner>
  );
};

export default SettingsLeftNavigation;