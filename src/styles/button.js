import styled from 'styled-components';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const PrimaryTouchableOpacity = styled.TouchableOpacity `
    border-width: 1px;
    border-color: #5CF7FF;
    background-color: #5CF7FF;
    paddingVertical: 12px;
    paddingHorizontal: 45px;
    align-items: center;
    border-radius: 50px;
    margin: 5px;
`
const ButtonText = styled.Text `
    color: #7E7777;
    font-weight: 700;
    font-size: 15px;
`
//El align-items: center es sin comillas. Importante o da error.
export const PrimaryButton = ({onPress, title}) => 
    <PrimaryTouchableOpacity onPress={onPress}>
        <ButtonText>{title}</ButtonText>
    </PrimaryTouchableOpacity>