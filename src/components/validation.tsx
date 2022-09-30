import * as yup from 'yup';

export const SinupValdation=yup.object({
    username:yup.string().required("Enter UserName"),
    password:yup.string().required("Enter password")
});



export const Sinup=yup.object({
    firstname:yup.string().required("Enter First Name"),
    lastname:yup.string().required("Enter Last Name"),
    username:yup.string().required("Enter First UserName"),
    password:yup.string().required("Enter password"),
    repassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm Password")
    
});
