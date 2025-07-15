import { useState, useEffect } from 'react';
import ProfileModal from './ProfileModal';
import { getUserProfile, updateUserProfile } from '../../../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth-provider'; // adjust path as needed

function Profile() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
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
          memberSince: new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), // Adjust based on backend field
          accountStatus: profile.status || 'Active',
        });
        setIsProfileLoading(false);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch profile');
        // Optionally, redirect to login if error is 401
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
        setIsProfileLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      const response = await updateUserProfile({
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
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message);
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