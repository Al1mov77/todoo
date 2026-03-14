import { atom } from 'jotai';

export interface User {
  id: number;
  name: string;
  age: number;
  status: boolean;
}

export const usersAtom = atom<User[]>([
  { id: 1, name: "Umar", age: 16, status: true }
]);

export const addUserAtom = atom(
  null,
  (get, set, user: User) => {
    const users = get(usersAtom);
    set(usersAtom, [...users, user]);
  }
);

export const deleteUserAtom = atom(
  null,
  (get, set, id: number) => {
    const users = get(usersAtom);
    set(usersAtom, users.filter(user => user.id != id));
  }
);

export const editUserAtom = atom(
  null,
  (get, set, updatedUser: User) => {
    const users = get(usersAtom);
    set(usersAtom, users.map(user => user.id == updatedUser.id ? updatedUser : user));
  }
);