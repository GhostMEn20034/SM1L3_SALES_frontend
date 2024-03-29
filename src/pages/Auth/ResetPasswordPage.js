import { useState } from "react";
import { ResetPasswordVerificateEmail, ResetPasswordEnterNewPassword } from "../../components/Auth/ResetPasswordComponents";

export default function ResetPasswordPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
        {!submitted ? (
            <ResetPasswordVerificateEmail setSubmitted={setSubmitted} />
        ): (
            <ResetPasswordEnterNewPassword />
        )}
        </>
    )

}