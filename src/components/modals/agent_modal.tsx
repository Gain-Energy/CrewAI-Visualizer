import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Icon } from "@iconify/react";
import { UPDATE_AGENT, DELETE_AGENT } from "@/utils/graphql_queries";
import { Agent } from "@/types/agent";
import { tools } from "@/data/data";
import { motion, AnimatePresence } from "framer-motion";
import TWFileInput from "../inputs/file";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function AgentModal({
  agent,
  showModal,
  setShowModal,
  onUpdateAgent = () => {},
  onUploadImage = () => {},
  onDeleteAgent = () => {},
}) {
  const [isEdit, setEdit] = useState(false);
  const [tempAgent, setTempAgent] = useState<Agent>(agent);
  const [imageFile, setImageFile] = useState<Blob>();
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
  const ReactSwal = withReactContent(Swal);

  useEffect(() => {
    setTempAgent(agent);
  }, [agent]);

  const [updateAgent, { loading: updateLoading }] = useMutation(UPDATE_AGENT);
  const [deleteAgent, { loading: deleteLoading }] = useMutation(DELETE_AGENT);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-zinc-900 rounded-xl shadow-xl max-w-4xl w-full overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-100">
              {isEdit ? 'Edit Agent' : agent?.role}
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Icon icon="ep:close-bold" className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Agent Details */}
              <div className="space-y-6">
                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Role</label>
                  <input
                    type="text"
                    value={tempAgent?.role}
                    onChange={(e) => setTempAgent({ ...tempAgent, role: e.target.value })}
                    disabled={!isEdit}
                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>

                {/* Goal */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Goal</label>
                  <textarea
                    value={tempAgent?.goal}
                    onChange={(e) => setTempAgent({ ...tempAgent, goal: e.target.value })}
                    disabled={!isEdit}
                    rows={3}
                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>

                {/* Tools */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Tools</label>
                  <div className="flex flex-wrap gap-2">
                    {tempAgent?.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-400">Allow Delegation</span>
                    <button
                      onClick={() => isEdit && setTempAgent({ ...tempAgent, allowDelegation: !tempAgent.allowDelegation })}
                      disabled={!isEdit}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${tempAgent?.allowDelegation ? 'bg-green-500' : 'bg-zinc-700'}
                        ${!isEdit && 'opacity-50 cursor-not-allowed'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                          ${tempAgent?.allowDelegation ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-400">Verbose</span>
                    <button
                      onClick={() => isEdit && setTempAgent({ ...tempAgent, verbose: !tempAgent.verbose })}
                      disabled={!isEdit}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${tempAgent?.verbose ? 'bg-green-500' : 'bg-zinc-700'}
                        ${!isEdit && 'opacity-50 cursor-not-allowed'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                          ${tempAgent?.verbose ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-400">Memory</span>
                    <button
                      onClick={() => isEdit && setTempAgent({ ...tempAgent, memory: !tempAgent.memory })}
                      disabled={!isEdit}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${tempAgent?.memory ? 'bg-green-500' : 'bg-zinc-700'}
                        ${!isEdit && 'opacity-50 cursor-not-allowed'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                          ${tempAgent?.memory ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-zinc-800">
                  <img
                    src={selectedImage as string || tempAgent?.image || "/agents_images/sailor.png"}
                    alt={tempAgent?.role}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {isEdit && (
                  <div className="space-y-4">
                    <TWFileInput
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          const reader = new FileReader();
                          reader.onloadend = () => setSelectedImage(reader.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-800 p-6">
            {!isEdit ? (
              <>
                <button
                  onClick={() => setEdit(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    ReactSwal.fire({
                      title: "Delete Agent?",
                      text: "This action cannot be undone.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#EF4444",
                      confirmButtonText: "Delete"
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteAgent({ variables: { id: parseInt(agent.id as string) } })
                          .then(() => {
                            setShowModal(false);
                            onDeleteAgent();
                          });
                      }
                    });
                  }}
                  disabled={deleteLoading}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEdit(false)}
                  className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateAgent({ variables: { ...tempAgent, id: parseInt(tempAgent.id as string) } })
                      .then(() => {
                        setShowModal(false);
                        setEdit(false);
                        onUpdateAgent();
                      });
                  }}
                  disabled={updateLoading || !tempAgent.role || !tempAgent.goal}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}