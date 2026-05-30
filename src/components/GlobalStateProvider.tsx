"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Agent = {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'revoked';
  createdAt: number;
};

export type AMLSettings = {
  rlEnabled: boolean;
  fgsmFilters: boolean;
  autoencoderTolerance: number;
};

type GlobalState = {
  agents: Agent[];
  addAgent: (name: string) => Agent;
  revokeAgent: (id: string) => void;
  deleteAgent: (id: string) => void;
  settings: AMLSettings;
  updateSettings: (newSettings: Partial<AMLSettings>) => void;
};

const defaultSettings: AMLSettings = {
  rlEnabled: true,
  fgsmFilters: true,
  autoencoderTolerance: 0.005,
};

const GlobalStateContext = createContext<GlobalState | null>(null);

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [settings, setSettings] = useState<AMLSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedAgents = localStorage.getItem('agentwall_agents');
    const savedSettings = localStorage.getItem('agentwall_settings');
    if (savedAgents) setAgents(JSON.parse(savedAgents));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('agentwall_agents', JSON.stringify(agents));
      localStorage.setItem('agentwall_settings', JSON.stringify(settings));
    }
  }, [agents, settings, isLoaded]);

  const addAgent = (name: string) => {
    const newAgent: Agent = {
      id: Math.random().toString(36).substring(7),
      name,
      key: 'aw_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      status: 'active',
      createdAt: Date.now(),
    };
    setAgents([newAgent, ...agents]);
    return newAgent;
  };

  const revokeAgent = (id: string) => {
    setAgents(agents.map(a => a.id === id ? { ...a, status: a.status === 'active' ? 'revoked' : 'active' } : a));
  };

  const deleteAgent = (id: string) => {
    setAgents(agents.filter(a => a.id !== id));
  };

  const updateSettings = (newSettings: Partial<AMLSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <GlobalStateContext.Provider value={{ agents, addAgent, revokeAgent, deleteAgent, settings, updateSettings }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) throw new Error("useGlobalState must be used within a GlobalStateProvider");
  return context;
};
