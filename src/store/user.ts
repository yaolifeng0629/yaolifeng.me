import { produce } from 'immer';
import { create } from 'zustand';

interface UserInfo {
    name: string;
    age: number;
}

interface UserState {
    userInfo: UserInfo;
    token: string;
    updateUserInfo: (parmas: UserInfo) => void;
    updateAge: (params: number) => void;
    updateToken: (params: string) => void;
}

const useUserStore = create<UserState>((set) => ({
    userInfo: {
        name: 'John',
        age: 23
    },
    token: 'xxx',
    updateUserInfo: (userInfo) => set({ userInfo }),
    updateAge: (age) =>
        set(
            produce((state) => {
                state.userInfo.age = age;
            })
        ),
    updateToken: (token) => set({ token })
}));

export default useUserStore;
