import proxy from "http-proxy-middleware";

export default function (app) {
    app.use(
        "/api",
        proxy({
            target: "http://localhost:3000", // 비즈니스 서버 URL 설정
            changeOrigin: true,
            pathRewrite: {
                "^/api": "",
            },
        })
    );
}
