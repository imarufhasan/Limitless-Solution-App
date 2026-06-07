export type RootState = {
  auth: {
    token: string | null;
    user: any | null;
  };
};