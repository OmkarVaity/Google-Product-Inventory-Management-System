import { toast } from 'react-toastify';

const displayToast = ({msg, type = "success"}) => toast[type](msg, {
        position: "top-center",
        autoClose: 3000});

export default displayToast;