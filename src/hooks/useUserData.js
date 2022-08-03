import { useEffect, useState } from "react";

// update in real time
function getProfileData() {
    return JSON.parse(localStorage.getItem('user'));
}

export default function useUserData() {
    const [profile, setProfile] = useState(getProfileData());

    useEffect(() => {
        function handleChangeStorage() {
            setProfile(getProfileData());
        }

        window.addEventListener('storage', handleChangeStorage);
        return () => window.removeEventListener('storage', handleChangeStorage);
    }, []);

    return profile;
}