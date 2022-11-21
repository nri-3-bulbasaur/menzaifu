import React from 'react';
// react-icons
// https://react-icons.github.io/react-icons
import { DiAndroid } from 'react-icons/di';
import { BsSearch } from 'react-icons/bs';

// ui-react icon: pathDataにSVGのd属性を指定
// d属性について: https://developer.mozilla.org/ja/docs/Web/SVG/Attribute/d
// ここでオリジナルのアイコンを作ってPathを取得できる
// https://yqnn.github.io/svg-path-editor/
import { Icon } from '@aws-amplify/ui-react';

const IconsDemo = () => {
  return (
    <>
      <DiAndroid />
      <BsSearch size={100} color={'#C31789'} />
      <Icon
        ariaLabel="Favorite"
        viewBox={{ width: 24, height: 24 }}
        pathData="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0
    3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </>
  );
};

export default IconsDemo;
