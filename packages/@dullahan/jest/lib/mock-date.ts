const mockDateAs = (epochMs: number): void => {
  if (typeof epochMs !== 'number') {
    console.error(
      'mockDateAs only accepts epoch values in milliseconds to prevent timezones from factoring in to Date creation.'
    );
  }

  jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(epochMs).valueOf());
};

export default mockDateAs;
