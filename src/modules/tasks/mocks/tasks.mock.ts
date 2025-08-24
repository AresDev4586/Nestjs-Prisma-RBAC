import { Tasks } from '../dto/tasks.type';

//Initial data
export const tasksMock: Tasks[] = [
  {
    id: 1,
    name: 'Work',
    description: 'Go to Work',
    status: false,
  },
  {
    id: 2,
    name: 'Home',
    description: 'Go to Home',
    status: true,
  },
];
