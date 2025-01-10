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

export interface UserStatusResolverArgs {
    _id : string
}

export interface UpdateUserStatusResolverArgs {
    status : string,
    _id : string
}

export interface UserDetailsResolverArgs {
    _id : string,
    token : string,
    decoded : any
}

export interface DeleteSessionResolverArgs {
    _id : string
}

export interface CheckCreateSessionResolverArgs {
    userId : string,
    token : string
}


