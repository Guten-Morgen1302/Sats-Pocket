import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Friend, useWallet } from "@/context/WalletContext";
import GlassmorphicCard from "./shared/GlassmorphicCard";
import { cn } from "@/lib/utils";

interface FriendSelectorProps {
  friends: Friend[];
  selectedFriends: Friend[];
  onToggle: (friend: Friend) => void;
}

const FriendSelector = ({ friends, selectedFriends, onToggle }: FriendSelectorProps) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newInitials, setNewInitials] = useState("");
  const { generateMockData } = useWallet();

  const handleAddNewClick = () => {
    setShowAddNew(true);
    // Generate random data if no friends are loaded
    if (friends.length === 0) {
      generateMockData();
    }
  };

  const handleCancel = () => {
    setShowAddNew(false);
    setNewName("");
    setNewInitials("");
  };

  const isSelected = (friend: Friend) => {
    return selectedFriends.some(f => f.id === friend.id);
  };

  const friendVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.3
      }
    }),
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(138, 43, 226, 0.2)"
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <AnimatePresence>
        {friends.map((friend, index) => (
          <motion.div
            key={friend.id}
            className={cn(
              "glass p-3 rounded-lg flex items-center space-x-2 hover:bg-primary/20 transition-colors duration-300 cursor-pointer",
              isSelected(friend) && "border border-primary"
            )}
            onClick={() => onToggle(friend)}
            variants={friendVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            custom={index}
            layout
          >
            <div className="w-8 h-8 rounded-full bg-gradient-blue flex items-center justify-center">
              <span className="text-white text-xs font-bold">{friend.initials}</span>
            </div>
            <span>{friend.name}</span>
            {isSelected(friend) && (
              <motion.i 
                className="ri-check-line text-primary"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              />
            )}
          </motion.div>
        ))}

        {showAddNew ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <GlassmorphicCard className="p-4 mt-2">
              <h4 className="text-sm font-medium mb-3">Add New Friend</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-dark border border-gray-700 rounded-lg focus:border-primary focus:outline-none text-white"
                    placeholder="Friend's name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Initials</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-dark border border-gray-700 rounded-lg focus:border-primary focus:outline-none text-white"
                    placeholder="AB"
                    maxLength={2}
                    value={newInitials}
                    onChange={(e) => setNewInitials(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <motion.button
                    className="px-3 py-1 rounded-lg glass hover:bg-error/20"
                    onClick={handleCancel}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="px-3 py-1 rounded-lg bg-gradient-purple text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // This is mocked - in a real app we would add the friend to the database
                      setShowAddNew(false);
                      setNewName("");
                      setNewInitials("");
                    }}
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        ) : (
          <motion.button
            className="glass p-3 rounded-lg flex items-center space-x-2 hover:bg-primary/20 transition-colors duration-300"
            onClick={handleAddNewClick}
            variants={friendVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            custom={friends.length}
          >
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center">
              <i className="ri-add-line"></i>
            </div>
            <span>Add New</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FriendSelector;
