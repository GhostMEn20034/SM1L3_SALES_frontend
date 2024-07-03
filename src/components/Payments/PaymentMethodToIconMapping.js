import PayPalSvgIcon from "../../iconComponents/Paypal/PayPalSvg";

export default function PaymentMethodToIconMapping(props) {
    const { paymentMethod, iconProps } = props;

    let mapping = {
        paypal: <PayPalSvgIcon {...iconProps} />
    };

    return mapping[paymentMethod];
}