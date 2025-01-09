// Auth resolver types
export interface SignupResolverArgs {
    name : string,
    email : string,
    password : string,
    confirmPassword : string,
}

export interface LoginResolverArgs {
    emailAddress : string,
    password : string
}

