import React from "react";
import { useNavigate } from "react-router-dom";

import { TmaxLogo } from "@/components/TmaxLogo";
import { AuthType } from "@/types";

export const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errMessage, setErrMessage] = React.useState("");

    const handleSignIn = async (payload: AuthType) => {
        if (payload.email === "" || payload.password === "") {
            setErrMessage("아이디 또는 비밀번호가 입력되지 않았습니다.");
        } else {
            console.log(payload);
        }
    };

    return (
        <div className="flex flex-1 flex-col w-full h-full items-center justify-center gap-3">
            <TmaxLogo />
            <div className="flex flex-col w-96 h-[23rem] p-4">
                <div className="flex flex-col h-[20rem] w-full gap-1 justify-center items-center">
                    <div className="flex flex-col w-full h-36 gap-2">
                        <input
                            className="flex flex-1 w-full border-[1px] border-black rounded-xl p-4"
                            type="email"
                            value={email}
                            placeholder="이메일을 입력하세요."
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="flex flex-1 w-full border-[1px] border-black rounded-xl p-4"
                            type="password"
                            value={password}
                            placeholder="비밀번호를 입력하세요."
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex w-full h-7 justify-center items-center">
                        <span className="font-semibold text-red-600 text-sm">
                            {errMessage}
                        </span>
                    </div>
                    <div className="flex w-full h-20 bg-slate-200">
                        <button
                            className="flex flex-1 justify-center items-center bg-[#666666]"
                            onClick={() => handleSignIn({ email, password })}
                        >
                            <span className="font-bold text-white">로그인</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-row w-full gap-3 items-center justify-center">
                    <input id="saveId" type="checkbox" className="scale-150" />
                    <label htmlFor="saveId">
                        <span className="text-lg">ID 저장</span>
                    </label>
                    <span className="text-lg">|</span>
                    <button
                        className="text-lg"
                        onClick={() => {
                            navigate("/sign-up");
                        }}
                    >
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};
