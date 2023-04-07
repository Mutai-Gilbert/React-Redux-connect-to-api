import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OneUser from "./oneUser";
import { getUsers } from "../users/usersSlice";

const Users = () => {
    const { users, isLoading, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getUsers());
    })

    if(isLoading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        );
    }
    if(error) {
        return (
            <div className="loading">
                <h1>Request Failed</h1>
            </div>
        );
    }

    return (
        <div>
            <ul>
                {users.map((user) => {
                    return <OneUser key={user.id} {...user} />
                })}
            </ul>
        </div>

    );
};
export default Users;