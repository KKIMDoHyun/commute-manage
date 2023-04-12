export type signUpFormType = {
    email: string;
    password: string;
    rePassword: string;
    name: string;
    errorInput: string;
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
