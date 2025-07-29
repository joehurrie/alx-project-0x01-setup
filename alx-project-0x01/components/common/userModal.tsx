import { UserData, UserModalProps } from "@/interfaces";
import React, { useState } from "react";

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit }) => {
  const [user, setUser] = useState<UserData>({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested fields like address.geo.lat
    const keys = name.split(".");
    setUser((prevUser) => {
      const updatedUser: any = { ...prevUser };
      let current = updatedUser;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updatedUser;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <input name="name" value={user.name} onChange={handleChange} placeholder="Name" className="input" />
          <input name="username" value={user.username} onChange={handleChange} placeholder="Username" className="input" />
          <input name="email" value={user.email} onChange={handleChange} placeholder="Email" className="input" />
          <input name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" className="input" />
          <input name="website" value={user.website} onChange={handleChange} placeholder="Website" className="input" />

          {/* Address Fields */}
          <h3 className="font-semibold text-gray-700">Address</h3>
          <input name="address.street" value={user.address.street} onChange={handleChange} placeholder="Street" className="input" />
          <input name="address.suite" value={user.address.suite} onChange={handleChange} placeholder="Suite" className="input" />
          <input name="address.city" value={user.address.city} onChange={handleChange} placeholder="City" className="input" />
          <input name="address.zipcode" value={user.address.zipcode} onChange={handleChange} placeholder="Zipcode" className="input" />
          <input name="address.geo.lat" value={user.address.geo.lat} onChange={handleChange} placeholder="Latitude" className="input" />
          <input name="address.geo.lng" value={user.address.geo.lng} onChange={handleChange} placeholder="Longitude" className="input" />

          {/* Company Fields */}
          <h3 className="font-semibold text-gray-700">Company</h3>
          <input name="company.name" value={user.company.name} onChange={handleChange} placeholder="Company Name" className="input" />
          <input name="company.catchPhrase" value={user.company.catchPhrase} onChange={handleChange} placeholder="Catch Phrase" className="input" />
          <input name="company.bs" value={user.company.bs} onChange={handleChange} placeholder="BS" className="input" />

          {/* Footer Buttons */}
          <div className="flex justify-between pt-4">
            <button type="button" onClick={onClose} className="text-gray-600 hover:text-gray-900">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
