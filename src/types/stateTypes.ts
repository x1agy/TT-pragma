export type TasksType = {
  id: number;
  title: string;
  email: string;
  description: string;
  status: string;
};

export type UserProfile = {
  role: 'admin' | 'user';
  email: string;
  password: string;
};
