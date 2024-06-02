export type TasksType = {
  id: number;
  title: string;
  email: string;
  description?: string;
  status: boolean;
};

export type UserProfile = {
  role: 'admin' | 'user';
  email: string;
  password: string;
};
