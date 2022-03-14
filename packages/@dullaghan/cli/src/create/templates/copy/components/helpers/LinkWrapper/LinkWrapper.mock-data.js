const defaultData = {
  className: 'hover:underline',
  field: {
    value: {
      href: 'https://www.horizontaldigital.com',
      text: 'Link Text',
      linktype: 'external',
      target: '_blank',
    },
  },
  suppressNewTabIcon: false,
  suppressLinkText: false,
  srOnlyText: 'Only screen readers can access this text',
};

export const internalLink = {
  ...defaultData,
  field: {
    value: {
      ...defaultData.field.value,
      target: undefined,
    },
  },
};

export const suppressIconAndText = {
  ...defaultData,
  suppressNewTabIcon: true,
  suppressLinkText: true,
};

export const noContent = {
  field: {
    value: {},
  },
  suppressLinkText: false,
};

export const fieldAsLinkFieldValue = {
  ...defaultData,
  field: {
    href: 'https://www.horizontaldigital.com',
    text: 'Link Text',
    linktype: 'external',
    target: '_blank',
  },
};

export default defaultData;
