import React from "react";
import AdminLayout from "../../../components/hoc/AdminLayout";
import AuthProfile from "./AuthProfile";
const Profile = () => {
  return (
    <AdminLayout section="Profile">
      <AuthProfile />
    </AdminLayout>
  );
};

export default Profile;
