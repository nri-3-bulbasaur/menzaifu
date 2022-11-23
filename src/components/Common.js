export const reactCardTheme = {
  name: 'card-theme',
  tokens: {
    components: {
      card: {
        boxShadow: { value: '{shadows.large}' },
        borderRadius: { value: '{radii.large}' },
        borderWidth: { value: '2px' },
      },
    },
  },
};

export const badgeClassNameList = {
  がっつり: 'badge-red',
  ヘルシー: 'badge-green',
  スイーツ: 'badge-yellow',
  飲み: 'badge-blue',
  テイクアウト: 'badge-blue',
};

export const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #999999',
  },
};
