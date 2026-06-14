export const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

export const validateLoginForm = (email: string, password: string) => {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
        errors.email = "Please Enter Your Email!";
    } else if (!isValidEmail(email)) {
        errors.email = "Enter Valid Email (example@mail.com)";
    }

    if (!password) {
        errors.password = "Please Enter Password";
    } else if (password.length < 6) {
        errors.password = "Password Must Be 6 Characters";
    }

    return errors;
};

export const validationRegisterForm = (
    name: string,
    email: string,
    phone: string,
    password: string,
    agreed: boolean
) => {
    const errors: { name?: string, email?: string, phone?: string, password?: string, agreed?: string } = {}
    if (!name.trim()) {
        errors.name = "Please Enter Your Name!";
    }
    if (!email.trim()) {
        errors.email = "Please Enter Your Email!";
    } else if (!isValidEmail(email)) {
        errors.email = "Enter Valid Email (example@mail.com)";
    }

    if (!phone.trim()) {
        errors.phone = "Please Enter Your Phone Number!";
    } else if (!/^[0-9]{10,11}$/.test(phone.trim())) {
        errors.phone = "Enter Valid Phone Number";
    }

    if (!password) {
        errors.password = "Enter Password";
    } else if (password.length < 6) {
        errors.password = "Password Must Be 6 Characters";
    }

    if (!agreed) {
        errors.agreed = "Please Accept Terms & Conditions";
    }

    return errors;


}