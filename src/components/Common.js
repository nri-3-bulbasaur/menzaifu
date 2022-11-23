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
