export type signUpFormType = {
    email: string;
    password: string;
    rePassword: string;
    name: string;
    errorInput: string;
};

export type signInFormType = {
    email: string;
    password: string;
    // [TODO] ID 저장 boolean 값 추가
};

export type signUpInputDto = {
    email: string;
    password: string;
    name: string;
};

export type signInInputDto = {
    email: string;
    password: string;
};
