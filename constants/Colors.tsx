import React from 'react';


const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const btnColor = "#841584";



export default {
  defaultBtnColor: btnColor,
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
