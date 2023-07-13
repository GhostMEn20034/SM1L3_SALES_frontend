import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";

export default function YourAccountPage() {
    const [message, setMessage] = useState();

    const api = useAxios();

    const getMessage = async () => {
        let response = await api.get("/api/auth/protected/");

        let data = await response.data;

        setMessage(data.message);
    }

    useEffect(() => {
        getMessage();
    }, [])

    return (<h1>
                {message}
            </h1>)
}
