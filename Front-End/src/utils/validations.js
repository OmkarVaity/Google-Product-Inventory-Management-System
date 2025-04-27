import displayToast from "./displayToast";

export const validateInputField = ({
    field,
    fieldName
}) => {
    if (field !== undefined && field != null && field !== "") {
        return true;
    }
    displayToast({
        type: "error",
        msg: `${fieldName} is not a valid input`
    });
    return false;
}