import { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";
import { getUserProfile, updateUserProfile } from "../../../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth-provider"; // adjust path as needed

function Profile() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile({
          fullName: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          memberSince: new Date(profile.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          accountStatus: profile.status || "Active",
        });
        setIsProfileLoading(false);
      } catch (error) {
        console.error("Profile fetch error:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          toast.error(
            "Access denied. Please log in with a user account or re-authenticate."
          );
          logout(); // Clear token and session
          navigate("/login");
        } else {
          toast.error(error.message || "Failed to fetch profile. Please try again.");
        }
        setIsProfileLoading(false);
      }
    };
    fetchProfile();
  }, [navigate, logout]);

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      await updateUserProfile({
        fullName: updatedProfile.fullName,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        address: updatedProfile.address,
      });
      setUserProfile({
        ...updatedProfile,
        memberSince: userProfile.memberSince,
        accountStatus: userProfile.accountStatus,
      });
      toast.success("Profile updated successfully!");
      // Do NOT close the modal here
    } catch (error) {
      console.error("Profile update error:", error);
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please log in with a user account.");
        logout();
        navigate("/login");
      } else {
        toast.error(error.message || "Failed to update profile.");
      }
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  if (isProfileLoading) return <div>Loading...</div>;

  return (
    <ProfileModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      userProfile={userProfile}
      onUpdateProfile={handleUpdateProfile}
    />
  );
}

export default Profile;