"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MISSIONS } from "@/utils/graphql_queries";
import MissionModal from "@/components/modals/mission_modal";
import NewMissionModal from "@/components/modals/new_mission_modal";
import { Mission } from "@/types/mission";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Alert, Button } from "@material-tailwind/react";

const MissionsPage = () => {
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showNewMissionModal, setShowNewMissionModal] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission>();

  const { loading, error, data, refetch } = useQuery(GET_MISSIONS);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Button
          variant="text"
          loading={true}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium px-6 py-2 rounded-lg"
        >
          Loading Missions...
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4">
        <Alert
          color="red"
          icon={
            <Icon icon="material-symbols:warning-outline" className="w-6 h-6" />
          }
          className="bg-red-50 border border-red-200 rounded-xl"
        >
          <p className="font-medium text-red-700">
            {error?.message ?? "An error occurred while loading missions."}
          </p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Missions
          </h1>
          <button
            onClick={() => setShowNewMissionModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Icon icon="mdi:add-bold" className="w-5 h-5" />
            <span>New Mission</span>
          </button>
        </div>

        {data?.missions.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <Alert
              color="blue"
              icon={
                <Icon
                  icon="material-symbols:info-outline"
                  className="w-6 h-6"
                />
              }
              className="bg-transparent border-none p-0"
            >
              <p className="font-medium text-blue-700">
                No missions yet. Click the button above to create your first
                mission.
              </p>
            </Alert>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.missions.map((mission: Mission, i: number) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedMission(mission);
                  setShowMissionModal(true);
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-green-500 transition-colors">
                        {mission.name}
                      </h3>
                      {mission.description && (
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                          {mission.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-green-400" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Icon icon="mdi:agent" className="w-4 h-4" />
                      {mission.agents?.length || 0} Agents
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon icon="mdi:clock-outline" className="w-4 h-4" />
                      {new Date(mission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <NewMissionModal
          showModal={showNewMissionModal}
          setShowModal={setShowNewMissionModal}
          onAddNewMission={refetch}
        />

        <MissionModal
          mission={selectedMission!}
          showModal={showMissionModal}
          setShowModal={setShowMissionModal}
          onUpdateMission={refetch}
          onRunMission={refetch}
          onDeleteMission={refetch}
        />
      </div>
    </div>
  );
};

export default MissionsPage;
