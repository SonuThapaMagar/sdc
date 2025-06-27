import { useState, useEffect } from 'react';
import ProfileModal from './ProfileModal';
import { getUserProfile, updateUserProfile } from '../../../services/userService';
import { toast } from 'react-toastify';

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

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

  if (isLoading) return <div>Loading...</div>;

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